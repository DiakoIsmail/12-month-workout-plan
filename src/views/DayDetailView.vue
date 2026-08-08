<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import {
  getDay, WEEKDAY_NAMES, MONTH_NAMES, PHASE_INFO,
  PROGRAM_START, CALENDAR_END,
} from '../data/calendar.js'
import { getGym, getCorePass } from '../data/exercises.js'
import { useProgress } from '../composables/useProgress.js'

const props = defineProps({ date: { type: String, required: true } })
const router = useRouter()
const { isExerciseDone, toggleExercise, isSessionDone, toggleSessionDone, sessionProgress, resetDay } = useProgress()

const day = computed(() => getDay(props.date))
const gym = computed(() => (day.value?.gym ? getGym(day.value.gym) : null))
const core = computed(() => (day.value?.corePass ? getCorePass(day.value.corePhase, day.value.corePass) : null))

const dateObj = computed(() => {
  const [y, m, d] = props.date.split('-').map(Number)
  return new Date(y, m - 1, d)
})
const niceDate = computed(() => {
  const wd = WEEKDAY_NAMES[day.value?.weekdayIndex ?? 0]
  return `${wd} ${dateObj.value.getDate()} ${MONTH_NAMES[dateObj.value.getMonth()].toLowerCase()} ${dateObj.value.getFullYear()}`
})

const restTip = computed(() => {
  if (!day.value) return ''
  if (day.value.weekdayIndex === 6) return 'Vila / aktiv återhämtning — stretch eller en promenad gör underverk.'
  if (day.value.weekdayIndex === 1 || day.value.weekdayIndex === 4) return 'Vila efter benpass. Lätt stretching eller en promenad rekommenderas.'
  return 'Ingen träning schemalagd denna dag.'
})

function prevDay() {
  const d = new Date(dateObj.value)
  d.setDate(d.getDate() - 1)
  const iso = d.toISOString().slice(0, 10)
  if (iso >= PROGRAM_START) router.replace({ name: 'day', params: { date: iso } })
}
function nextDay() {
  const d = new Date(dateObj.value)
  d.setDate(d.getDate() + 1)
  const iso = d.toISOString().slice(0, 10)
  if (iso <= CALENDAR_END) router.replace({ name: 'day', params: { date: iso } })
}

function goBack() {
  router.push({ name: 'calendar' })
}

function progressLabel(section) {
  const p = sessionProgress(props.date, section)
  return `${p.done}/${p.total}`
}
</script>

<template>
  <div class="page safe-top" v-if="day">
    <header class="head">
      <button class="btn icon-btn" @click="goBack" aria-label="Tillbaka till kalendern">
        <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 18l-6-6 6-6"/></svg>
      </button>
      <div class="date-nav">
        <button class="btn icon-btn sm" @click="prevDay" aria-label="Föregående dag">‹</button>
        <div class="date-title">
          <h1>{{ niceDate }}</h1>
          <span v-if="day.phase" class="phase-tag" :class="'phase-' + day.phase">{{ PHASE_INFO[day.phase].name }}</span>
        </div>
        <button class="btn icon-btn sm" @click="nextDay" aria-label="Nästa dag">›</button>
      </div>
    </header>

    <div class="badges" v-if="day.badges.length || day.isDeload">
      <span v-if="day.badges.includes('START')" class="badge b-start">🚀 Programstart</span>
      <span v-if="day.badges.includes('TEST')" class="badge b-test">★ Test — vecka {{ day.badges.includes('V12') ? 12 : day.badges.includes('V24') ? 24 : 36 }}</span>
      <span v-if="day.badges.includes('SLUTTEST')" class="badge b-test">🏁 Sluttest</span>
      <span v-if="day.isDeload" class="badge b-deload">Deload-vecka — sänk volym 40%</span>
      <span v-if="gym?.isLegDay" class="badge b-ben">BEN — vila imorgon</span>
    </div>

    <!-- GYM -->
    <section v-if="gym" class="card session">
      <div class="session-head" :style="{ '--accent-c': `var(--${gym.color})`, '--accent-bg': `var(--${gym.color}-bg)` }">
        <div>
          <h2>{{ gym.title }}</h2>
          <p class="sub">{{ gym.subtitle }}</p>
        </div>
        <button class="mark-btn" :class="{ done: isSessionDone(date, 'gym') }" @click="toggleSessionDone(date, 'gym')">
          <svg viewBox="0 0 20 20" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M4 10.5l4 4 8-9"/></svg>
          {{ isSessionDone(date, 'gym') ? 'Klart' : progressLabel('gym') }}
        </button>
      </div>
      <ul class="ex-list">
        <li v-for="(ex, i) in gym.exercises" :key="i" class="ex" :class="{ done: isExerciseDone(date, 'gym', i) }" @click="toggleExercise(date, 'gym', i)">
          <span class="ex-check"><svg v-if="isExerciseDone(date,'gym',i)" viewBox="0 0 20 20" width="13" height="13" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M4 10.5l4 4 8-9"/></svg></span>
          <span class="ex-body">
            <span class="ex-top"><b>{{ ex.name }}</b><span class="scheme">{{ ex.scheme }}</span></span>
            <span class="ex-note">{{ ex.note }}</span>
          </span>
        </li>
      </ul>
    </section>

    <!-- CORE -->
    <section v-if="core" class="card session">
      <div class="session-head" :style="{ '--accent-c': day.isDeload ? 'var(--deload)' : `var(--core${day.corePhase})`, '--accent-bg': day.isDeload ? 'var(--deload-bg)' : `var(--core${day.corePhase}-bg)` }">
        <div>
          <h2>{{ core.title }}</h2>
          <p class="sub">{{ PHASE_INFO[day.corePhase].name }} · {{ core.weekday }}<span v-if="day.isDeload"> · Deload</span></p>
        </div>
        <button class="mark-btn" :class="{ done: isSessionDone(date, 'core') }" @click="toggleSessionDone(date, 'core')">
          <svg viewBox="0 0 20 20" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M4 10.5l4 4 8-9"/></svg>
          {{ isSessionDone(date, 'core') ? 'Klart' : progressLabel('core') }}
        </button>
      </div>
      <p v-if="core.note" class="core-note">{{ core.note }}</p>
      <p v-if="day.isDeload" class="core-note deload-note">Deload-vecka: kör passet med ca 40% lägre volym (färre set eller lättare belastning) än normalt.</p>
      <ul class="ex-list">
        <li v-for="(ex, i) in core.exercises" :key="i" class="ex" :class="{ done: isExerciseDone(date, 'core', i) }" @click="toggleExercise(date, 'core', i)">
          <span class="ex-check"><svg v-if="isExerciseDone(date,'core',i)" viewBox="0 0 20 20" width="13" height="13" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M4 10.5l4 4 8-9"/></svg></span>
          <span class="ex-body">
            <span class="ex-top"><b>{{ ex.name }}</b><span class="scheme">{{ ex.scheme }}</span></span>
            <span class="ex-note">{{ ex.note }}</span>
          </span>
        </li>
      </ul>
    </section>

    <!-- REST -->
    <section v-if="!gym && !core" class="card rest-card">
      <svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M4 17h16M6 17V7a2 2 0 012-2h8a2 2 0 012 2v10M2 17h20M4 21v-2M20 21v-2"/></svg>
      <p>{{ restTip }}</p>
    </section>

    <button v-if="gym || core" class="btn reset-link" @click="resetDay(date)">Rensa avbockningar för dagen</button>
  </div>
</template>

<style scoped>
.page { padding: 14px 14px 32px; }

.head { display: flex; align-items: flex-start; gap: 10px; }
.icon-btn { width: 38px; height: 38px; padding: 0; border-radius: 999px; flex-shrink: 0; }
.icon-btn.sm { width: 30px; height: 30px; font-size: 16px; }

.date-nav { flex: 1; display: flex; align-items: center; justify-content: space-between; gap: 6px; padding-top: 3px; }
.date-title { text-align: center; flex: 1; min-width: 0; }
.date-title h1 { font-size: 15.5px; font-weight: 800; }
.phase-tag {
  display: inline-block; margin-top: 5px; font-size: 10.5px; font-weight: 700; padding: 2px 9px;
  border-radius: 999px; background: var(--bg-inset); color: var(--text-dim);
}
.phase-tag.phase-1 { background: var(--core1-bg); color: var(--core1); }
.phase-tag.phase-2 { background: var(--core2-bg); color: var(--core2); }
.phase-tag.phase-3 { background: var(--core3-bg); color: var(--core3); }
.phase-tag.phase-4 { background: var(--core4-bg); color: var(--core4); }

.badges { display: flex; flex-wrap: wrap; gap: 6px; margin-top: 14px; }
.badge { font-size: 11px; font-weight: 700; padding: 5px 10px; border-radius: 999px; }
.b-start { background: var(--core1-bg); color: var(--core1); }
.b-test { background: #fdf0c8; color: #96751a; }
.b-deload { background: var(--deload-bg); color: var(--deload); }
.b-ben { background: var(--gym4-bg); color: var(--gym4); }

.session { margin-top: 16px; overflow: hidden; }
.session-head {
  display: flex; align-items: center; justify-content: space-between; gap: 10px;
  padding: 14px 16px; background: var(--accent-bg); border-bottom: 1px solid var(--border);
}
.session-head h2 { font-size: 15px; font-weight: 800; color: var(--accent-c); }
.session-head .sub { font-size: 11.5px; color: var(--text-dim); margin-top: 2px; font-weight: 600; }

.mark-btn {
  appearance: none; border: 1.5px solid var(--accent-c); color: var(--accent-c); background: var(--bg-elevated);
  border-radius: 999px; padding: 7px 12px; font-size: 12px; font-weight: 800;
  display: flex; align-items: center; gap: 5px; cursor: pointer; flex-shrink: 0;
}
.mark-btn.done { background: var(--accent-c); color: var(--bg-elevated); }

.core-note { padding: 12px 16px 0; font-size: 12.5px; color: var(--text-dim); line-height: 1.45; }
.deload-note { color: var(--deload); font-weight: 600; }

.ex-list { list-style: none; margin: 0; padding: 6px 0 4px; }
.ex {
  display: flex; gap: 10px; align-items: flex-start; padding: 10px 16px; cursor: pointer;
  border-top: 1px solid var(--border);
}
.ex:first-child { border-top: none; }
.ex-check {
  width: 20px; height: 20px; border-radius: 999px; border: 2px solid var(--border);
  flex-shrink: 0; margin-top: 1px; display: flex; align-items: center; justify-content: center;
  color: var(--accent-text); background: var(--bg-inset);
}
.ex.done .ex-check { background: var(--success); border-color: var(--success); color: #fff; }
.ex-body { flex: 1; min-width: 0; }
.ex-top { display: flex; align-items: baseline; justify-content: space-between; gap: 8px; font-size: 13.5px; }
.ex.done .ex-top b { text-decoration: line-through; color: var(--text-dim); }
.scheme { font-size: 11.5px; font-weight: 700; color: var(--text-dim); white-space: nowrap; }
.ex-note { display: block; font-size: 12px; color: var(--text-dim); margin-top: 2px; line-height: 1.4; }

.rest-card {
  margin-top: 16px; padding: 28px 20px; display: flex; flex-direction: column; align-items: center;
  gap: 10px; text-align: center; color: var(--text-dim);
}
.rest-card p { font-size: 13.5px; line-height: 1.5; max-width: 320px; }

.reset-link {
  display: block; margin: 18px auto 0; border: none; background: none; color: var(--text-dim);
  font-size: 12px; text-decoration: underline;
}
</style>
