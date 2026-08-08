// Kalendergenerator — bygger hela 12-månadersschemat (10 aug 2026 – 10 aug 2027 + utfasningsvecka)
// programmatiskt utifrån veckomönstret i PDF:en, istället för att transkribera 380+ celler för hand.
// Mönstret är verifierat mot kalendersidorna för aug/sep/okt/nov 2026, dec 2026–jan 2027,
// feb–apr 2027 och maj–aug 2027 i källdokumentet.

export const PROGRAM_START = '2026-08-10' // Måndag, vecka 1 dag 1
export const CALENDAR_END = '2027-08-31' // Sista sidan i källkalendern

const MS_PER_DAY = 24 * 60 * 60 * 1000

function parseISO(s) {
  const [y, m, d] = s.split('-').map(Number)
  return new Date(Date.UTC(y, m - 1, d))
}
function toISO(date) {
  return date.toISOString().slice(0, 10)
}
function addDays(date, n) {
  return new Date(date.getTime() + n * MS_PER_DAY)
}
// Måndagsindexerad veckodag: 0=Mån .. 6=Sön
function mondayIndex(date) {
  return (date.getUTCDay() + 6) % 7
}

export const WEEKDAY_NAMES = ['Måndag', 'Tisdag', 'Onsdag', 'Torsdag', 'Fredag', 'Lördag', 'Söndag']
export const WEEKDAY_SHORT = ['Mån', 'Tis', 'Ons', 'Tor', 'Fre', 'Lör', 'Sön']
export const MONTH_NAMES = [
  'Januari', 'Februari', 'Mars', 'April', 'Maj', 'Juni',
  'Juli', 'Augusti', 'September', 'Oktober', 'November', 'December',
]

export const PHASE_INFO = {
  1: { name: 'Fas 1 — Foundation', color: 'core1' },
  2: { name: 'Fas 2 — Strength', color: 'core2' },
  3: { name: 'Fas 3 — Power', color: 'core3' },
  4: { name: 'Fas 4 — Peak', color: 'core4' },
}

// Veckomall per fas: [gymId|null, corePassId|null] för varje veckodag (Mån..Sön)
const TEMPLATES = {
  1: [
    ['D1', 'p1'], [null, null], ['D2', 'p2'], ['D3', null], [null, 'p3'], ['D4', null], [null, null],
  ],
  2: [
    ['D1', 'p1'], [null, 'p2'], ['D2', null], ['D3', 'p3'], [null, 'p4'], ['D4', null], [null, null],
  ],
  3: [
    ['D1', 'p1'], [null, 'p2'], ['D2', null], ['D3', 'p3'], [null, 'p4'], ['D4', null], [null, null],
  ],
  4: [
    ['D1', 'p1'], [null, 'p2'], ['D2', 'p3'], ['D3', null], [null, 'p4'], ['D4', 'p5'], [null, null],
  ],
}

function phaseForWeek(W) {
  if (W >= 1 && W <= 13) return { phase: 1, wp: W }
  if (W >= 14 && W <= 26) return { phase: 2, wp: W - 13 }
  if (W >= 27 && W <= 39) return { phase: 3, wp: W - 26 }
  if (W >= 40 && W <= 52) return { phase: 4, wp: W - 39 }
  if (W === 53) return { phase: 4, wp: 14 } // Sluttest-vecka, hanteras separat
  return { phase: null, wp: null }
}

function buildDay(date, start) {
  const iso = toISO(date)
  const wIdx = mondayIndex(date) // 0=Mån..6=Sön
  const daysSinceStart = Math.round((date - start) / MS_PER_DAY)
  const W = Math.floor(daysSinceStart / 7) + 1 // vecka 1-baserad

  const badges = []
  let gym = null
  let corePhase = null
  let corePass = null
  let isDeload = false

  if (daysSinceStart < 0) {
    // Före start — visas ej som träningsdag
  } else if (W === 53) {
    // Sluttest-vecka: bara måndagen är aktiv (Fas 4-mönster, ingen deload), resten är vila/nedtrappning
    if (wIdx === 0) {
      const [g, cp] = TEMPLATES[4][0]
      gym = g
      corePhase = 4
      corePass = cp
      badges.push('SLUTTEST')
    }
  } else if (W > 53) {
    // Ren vila/nedtrappning efter programmets slut
  } else {
    const { phase, wp } = phaseForWeek(W)
    corePhase = phase
    isDeload = phase >= 2 && [4, 8, 12].includes(wp)
    const [g, cp] = TEMPLATES[phase][wIdx]
    gym = g
    corePass = cp

    if (W === 1 && wIdx === 0) badges.push('START')
    if (W === 13 && wIdx === 0) badges.push('TEST', 'V12')
    if (W === 25 && wIdx === 0) badges.push('TEST', 'V24')
    if (W === 37 && wIdx === 0) badges.push('TEST', 'V36')
  }

  if (gym) {
    badges.push('GYM')
  }
  if (corePass && isDeload) badges.push('DELOAD')

  return {
    date: iso,
    weekdayIndex: wIdx,
    weekNumber: daysSinceStart >= 0 && W <= 53 ? W : null,
    phase: corePhase,
    isDeload,
    gym,
    corePhase,
    corePass,
    badges,
    isRest: !gym && !corePass,
  }
}

let _cache = null
export function buildCalendar() {
  if (_cache) return _cache
  const start = parseISO(PROGRAM_START)
  const end = parseISO(CALENDAR_END)
  const days = []
  let cur = start
  while (cur <= end) {
    days.push(buildDay(cur, start))
    cur = addDays(cur, 1)
  }
  _cache = days
  return days
}

let _byDate = null
export function getDay(dateISO) {
  if (!_byDate) {
    _byDate = new Map()
    for (const d of buildCalendar()) _byDate.set(d.date, d)
  }
  return _byDate.get(dateISO) || null
}

export function todayISO() {
  const d = new Date()
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
}

// Datumet "Idag"-knappen ska hoppa till: dagens datum om det ligger inom
// programperioden, annars närmaste kant (start- eller slutdatum).
export function resolveTodayTarget() {
  const t = todayISO()
  if (t < PROGRAM_START) return PROGRAM_START
  if (t > CALENDAR_END) return CALENDAR_END
  return t
}

// Grupperar kalendern i månader för kalendervyn: [{ year, month(0-11), days: [dayObj|null...] }]
export function getMonths() {
  const all = buildCalendar()
  const map = new Map()
  for (const d of all) {
    const [y, m] = d.date.split('-').map(Number)
    const key = `${y}-${m}`
    if (!map.has(key)) map.set(key, { year: y, month: m - 1, days: [] })
    map.get(key).days.push(d)
  }
  return [...map.values()].sort((a, b) => (a.year - b.year) || (a.month - b.month))
}

export function getPhaseDateRanges() {
  const all = buildCalendar()
  const ranges = {}
  for (const d of all) {
    if (!d.phase) continue
    if (!ranges[d.phase]) ranges[d.phase] = { start: d.date, end: d.date }
    else ranges[d.phase].end = d.date
  }
  return ranges
}

export function phaseLabelForMonth(monthObj) {
  const counts = {}
  for (const d of monthObj.days) {
    if (d.phase) counts[d.phase] = (counts[d.phase] || 0) + 1
  }
  let best = null, bestN = 0
  for (const [p, n] of Object.entries(counts)) {
    if (n > bestN) { best = Number(p); bestN = n }
  }
  return best ? PHASE_INFO[best].name : null
}
