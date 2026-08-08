import { reactive, watch, computed } from 'vue'
import { buildCalendar } from '../data/calendar.js'
import { getGym, getCorePass } from '../data/exercises.js'

const STORAGE_KEY = 'wp-progress-v1'

function load() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) return JSON.parse(raw)
  } catch (e) {
    console.warn('Kunde inte läsa sparad progress:', e)
  }
  return {}
}

// Enda reaktiva store-instansen — delas av alla komponenter som importerar composabeln.
const state = reactive(load())

let saveTimer = null
watch(
  state,
  () => {
    clearTimeout(saveTimer)
    saveTimer = setTimeout(() => {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
      } catch (e) {
        console.warn('Kunde inte spara progress till localStorage:', e)
      }
    }, 150)
  },
  { deep: true }
)

function ensureDay(date) {
  if (!state[date]) state[date] = {}
  return state[date]
}
function ensureSection(date, section) {
  const day = ensureDay(date)
  if (!day[section]) day[section] = { done: false, ex: {} }
  return day[section]
}

function sessionExerciseCount(date, section) {
  const day = buildCalendar().find((d) => d.date === date)
  if (!day) return 0
  if (section === 'gym') return getGym(day.gym)?.exercises.length || 0
  if (section === 'core') return getCorePass(day.corePhase, day.corePass)?.exercises.length || 0
  return 0
}

export function useProgress() {
  function isExerciseDone(date, section, idx) {
    return !!state[date]?.[section]?.ex?.[idx]
  }

  function toggleExercise(date, section, idx) {
    const sec = ensureSection(date, section)
    sec.ex[idx] = !sec.ex[idx]
    // Om alla övningar är avbockade -> markera passet som klart automatiskt
    const total = sessionExerciseCount(date, section)
    const doneCount = Object.values(sec.ex).filter(Boolean).length
    if (total > 0 && doneCount === total) sec.done = true
    else if (!sec.ex[idx] && sec.done) sec.done = false
  }

  function isSessionDone(date, section) {
    return !!state[date]?.[section]?.done
  }

  function toggleSessionDone(date, section) {
    const sec = ensureSection(date, section)
    sec.done = !sec.done
    if (sec.done) {
      const total = sessionExerciseCount(date, section)
      for (let i = 0; i < total; i++) sec.ex[i] = true
    } else {
      sec.ex = {}
    }
  }

  function sessionProgress(date, section) {
    const total = sessionExerciseCount(date, section)
    const sec = state[date]?.[section]
    const doneCount = sec ? Object.values(sec.ex || {}).filter(Boolean).length : 0
    return { done: doneCount, total }
  }

  function dayHasAnyProgress(date) {
    const d = state[date]
    if (!d) return false
    return !!(d.gym?.done || d.core?.done || Object.values(d.gym?.ex || {}).some(Boolean) || Object.values(d.core?.ex || {}).some(Boolean))
  }

  function dayFullyDone(date, dayObj) {
    let ok = true
    if (dayObj.gym) ok = ok && isSessionDone(date, 'gym')
    if (dayObj.corePass) ok = ok && isSessionDone(date, 'core')
    if (!dayObj.gym && !dayObj.corePass) return false
    return ok
  }

  function resetDay(date) {
    delete state[date]
  }

  function resetAll() {
    for (const k of Object.keys(state)) delete state[k]
  }

  function exportJSON() {
    return JSON.stringify(state, null, 2)
  }

  function importJSON(json) {
    const parsed = JSON.parse(json)
    for (const k of Object.keys(state)) delete state[k]
    Object.assign(state, parsed)
  }

  // Statistik över hela programmet
  const stats = computed(() => {
    const all = buildCalendar()
    let scheduledGym = 0, doneGym = 0
    let scheduledCore = 0, doneCore = 0
    let streak = 0
    let brokeStreak = false
    const todayStr = new Date().toISOString().slice(0, 10)
    const past = all.filter((d) => d.date <= todayStr)

    for (const d of all) {
      if (d.gym) { scheduledGym++; if (isSessionDone(d.date, 'gym')) doneGym++ }
      if (d.corePass) { scheduledCore++; if (isSessionDone(d.date, 'core')) doneCore++ }
    }
    // Streak: räkna bakåt från idag, dagar med schemalagt pass som är helt avklarade
    for (let i = past.length - 1; i >= 0; i--) {
      const d = past[i]
      if (!d.gym && !d.corePass) continue // vilodag, påverkar inte streak
      if (dayFullyDone(d.date, d)) {
        if (!brokeStreak) streak++
      } else {
        brokeStreak = true
        break
      }
    }
    const totalScheduled = scheduledGym + scheduledCore
    const totalDone = doneGym + doneCore
    return {
      scheduledGym, doneGym, scheduledCore, doneCore,
      totalScheduled, totalDone,
      pct: totalScheduled ? Math.round((totalDone / totalScheduled) * 100) : 0,
      streak,
    }
  })

  return {
    state,
    isExerciseDone,
    toggleExercise,
    isSessionDone,
    toggleSessionDone,
    sessionProgress,
    dayHasAnyProgress,
    dayFullyDone,
    resetDay,
    resetAll,
    exportJSON,
    importJSON,
    stats,
  }
}
