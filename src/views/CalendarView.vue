<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { getMonths, phaseLabelForMonth, MONTH_NAMES, WEEKDAY_SHORT, todayISO } from '../data/calendar.js'
import { getGym, getCorePass } from '../data/exercises.js'
import { useProgress } from '../composables/useProgress.js'
import { selectedMonthIndex } from '../composables/uiState.js'

const router = useRouter()
const { dayFullyDone, dayHasAnyProgress, stats } = useProgress()
const months = getMonths()
const today = todayISO()

const month = computed(() => months[selectedMonthIndex.value])
const phaseLabel = computed(() => (month.value ? phaseLabelForMonth(month.value) : null))

const leadingBlanks = computed(() => (month.value ? month.value.days[0].weekdayIndex : 0))

function prevMonth() {
  if (selectedMonthIndex.value > 0) selectedMonthIndex.value--
}
function nextMonth() {
  if (selectedMonthIndex.value < months.length - 1) selectedMonthIndex.value++
}
function jumpTo(e) {
  selectedMonthIndex.value = Number(e.target.value)
}

function openDay(d) {
  router.push({ name: 'day', params: { date: d.date } })
}

function gymColorVar(gymId) {
  return gymId ? `var(--${getGym(gymId).color})` : 'transparent'
}
function coreColorVar(day) {
  if (!day.corePass) return 'transparent'
  return day.isDeload ? 'var(--deload)' : `var(--core${day.corePhase})`
}
function cellStatus(d) {
  if (dayFullyDone(d.date, d)) return 'done'
  if (dayHasAnyProgress(d.date)) return 'partial'
  return 'none'
}
</script>

<template>
  <div class="page safe-top" v-if="month">
    <header class="head">
      <div class="head-top">
        <h1>12-månaders träningsplan</h1>
        <router-link to="/info" class="info-btn" aria-label="Info">
          <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 8h.01M11 12h1v5h1"/></svg>
        </router-link>
      </div>

      <div class="month-nav">
        <button class="btn nav-btn" @click="prevMonth" :disabled="selectedMonthIndex === 0" aria-label="Föregående månad">‹</button>
        <div class="month-title">
          <select class="month-select" :value="selectedMonthIndex" @change="jumpTo">
            <option v-for="(m, i) in months" :key="i" :value="i">{{ MONTH_NAMES[m.month] }} {{ m.year }}</option>
          </select>
          <span v-if="phaseLabel" class="phase-tag" :class="'phase-' + (month.days.find(d=>d.phase)?.phase || 1)">{{ phaseLabel }}</span>
        </div>
        <button class="btn nav-btn" @click="nextMonth" :disabled="selectedMonthIndex === months.length - 1" aria-label="Nästa månad">›</button>
      </div>

      <div class="progress-strip">
        <div class="progress-bar"><div class="progress-fill" :style="{ width: stats.pct + '%' }" /></div>
        <span class="progress-label">{{ stats.pct }}% klart · {{ stats.streak }} dagars streak</span>
      </div>
    </header>

    <div class="weekdays">
      <span v-for="w in WEEKDAY_SHORT" :key="w">{{ w }}</span>
    </div>

    <div class="grid">
      <div v-for="n in leadingBlanks" :key="'b' + n" class="cell blank" />
      <button
        v-for="d in month.days"
        :key="d.date"
        class="cell"
        :class="[cellStatus(d), { today: d.date === today, restday: !d.gym && !d.corePass }]"
        @click="openDay(d)"
      >
        <span class="daynum">{{ Number(d.date.slice(8, 10)) }}</span>
        <span v-if="d.isDeload" class="dl-tag">DL</span>
        <span v-if="d.badges.includes('START')" class="mark start-mark">▶</span>
        <span v-if="d.badges.includes('TEST')" class="mark test-mark">★</span>
        <span v-if="d.badges.includes('SLUTTEST')" class="mark test-mark">🏁</span>
        <span class="bars">
          <span class="bar" :style="{ background: gymColorVar(d.gym) }" />
          <span class="bar" :style="{ background: coreColorVar(d) }" />
        </span>
        <svg v-if="cellStatus(d) === 'done'" class="check" viewBox="0 0 20 20" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M4 10.5l4 4 8-9"/></svg>
        <span v-else-if="cellStatus(d) === 'partial'" class="check partial-dot" />
      </button>
    </div>

    <div class="legend scrollbar-hidden">
      <span class="lg-item"><i :style="{ background: 'var(--gym1)' }" /> D1 Ben&Axlar</span>
      <span class="lg-item"><i :style="{ background: 'var(--gym2)' }" /> D2 Bröst/Bi/Tri</span>
      <span class="lg-item"><i :style="{ background: 'var(--gym3)' }" /> D3 Ben&Axlar</span>
      <span class="lg-item"><i :style="{ background: 'var(--gym4)' }" /> D4 Rygg</span>
      <span class="lg-item"><i :style="{ background: 'var(--deload)' }" /> Deload</span>
    </div>
  </div>
</template>

<style scoped>
.page { padding: 14px 14px 22px; }

.head-top { display: flex; align-items: center; justify-content: space-between; gap: 8px; }
.head-top h1 { font-size: 17px; font-weight: 800; }
.info-btn { color: var(--text-dim); display: flex; }

.month-nav { display: flex; align-items: center; justify-content: space-between; margin-top: 14px; gap: 8px; }
.nav-btn { width: 38px; height: 38px; padding: 0; font-size: 20px; border-radius: 999px; flex-shrink: 0; }
.month-title { display: flex; flex-direction: column; align-items: center; gap: 4px; flex: 1; min-width: 0; }
.month-select {
  appearance: none; border: none; background: none; color: var(--text);
  font-size: 18px; font-weight: 800; text-align: center; text-align-last: center;
}
.phase-tag {
  font-size: 10.5px; font-weight: 700; padding: 2px 9px; border-radius: 999px;
  background: var(--bg-inset); color: var(--text-dim);
}
.phase-tag.phase-1 { background: var(--core1-bg); color: var(--core1); }
.phase-tag.phase-2 { background: var(--core2-bg); color: var(--core2); }
.phase-tag.phase-3 { background: var(--core3-bg); color: var(--core3); }
.phase-tag.phase-4 { background: var(--core4-bg); color: var(--core4); }

.progress-strip { margin-top: 14px; display: flex; align-items: center; gap: 10px; }
.progress-bar { flex: 1; height: 6px; border-radius: 999px; background: var(--bg-inset); overflow: hidden; }
.progress-fill { height: 100%; background: var(--accent); border-radius: 999px; transition: width 0.3s ease; }
.progress-label { font-size: 11px; color: var(--text-dim); white-space: nowrap; font-weight: 600; }

.weekdays {
  display: grid; grid-template-columns: repeat(7, 1fr);
  margin-top: 18px; margin-bottom: 6px;
}
.weekdays span { text-align: center; font-size: 11px; font-weight: 700; color: var(--text-dim); }

.grid { display: grid; grid-template-columns: repeat(7, 1fr); gap: 4px; }
.cell {
  appearance: none; border: 1px solid var(--border); background: var(--bg-elevated);
  border-radius: 10px; aspect-ratio: 1 / 1.05; position: relative;
  padding: 4px; cursor: pointer; display: flex; flex-direction: column;
  min-width: 0; overflow: hidden;
}
.cell.blank { visibility: hidden; border: none; }
.cell.restday { background: var(--bg-inset); }
.cell.today { border-color: var(--accent); border-width: 2px; }

.daynum { font-size: 12px; font-weight: 700; color: var(--text); }
.restday .daynum { color: var(--text-dim); }

.dl-tag {
  position: absolute; top: 3px; right: 3px; font-size: 7.5px; font-weight: 800;
  color: var(--deload); background: var(--deload-bg); padding: 1px 3px; border-radius: 4px;
}
.mark { position: absolute; top: 2px; left: 16px; font-size: 8px; line-height: 1; }
.start-mark { color: var(--success); }
.test-mark { font-size: 9px; }

.bars {
  margin-top: auto; display: flex; flex-direction: column; gap: 2px; border-radius: 3px; overflow: hidden;
}
.bar { height: 5px; width: 100%; border-radius: 2px; }

.check {
  position: absolute; bottom: 3px; right: 3px; color: var(--success);
  background: var(--bg-elevated); border-radius: 999px;
}
.partial-dot {
  width: 7px; height: 7px; border-radius: 999px; background: var(--accent);
}

.legend {
  display: flex; gap: 12px; margin-top: 18px; overflow-x: auto; padding-bottom: 4px;
}
.lg-item { display: flex; align-items: center; gap: 5px; font-size: 11px; color: var(--text-dim); white-space: nowrap; font-weight: 600; }
.lg-item i { width: 8px; height: 8px; border-radius: 999px; display: inline-block; }
</style>
