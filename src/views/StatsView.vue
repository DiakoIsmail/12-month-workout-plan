<script setup>
import { computed, ref } from 'vue'
import { buildCalendar, PHASE_INFO } from '../data/calendar.js'
import { useProgress } from '../composables/useProgress.js'

const { stats, isSessionDone, exportJSON, importJSON, resetAll } = useProgress()
const fileInput = ref(null)
const importMsg = ref('')

const perPhase = computed(() => {
  const all = buildCalendar()
  const byPhase = { 1: { scheduled: 0, done: 0 }, 2: { scheduled: 0, done: 0 }, 3: { scheduled: 0, done: 0 }, 4: { scheduled: 0, done: 0 } }
  for (const d of all) {
    if (!d.phase) continue
    if (d.gym) { byPhase[d.phase].scheduled++; if (isSessionDone(d.date, 'gym')) byPhase[d.phase].done++ }
    if (d.corePass) { byPhase[d.phase].scheduled++; if (isSessionDone(d.date, 'core')) byPhase[d.phase].done++ }
  }
  return byPhase
})

function download() {
  const blob = new Blob([exportJSON()], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `traningsplan-progress-${new Date().toISOString().slice(0, 10)}.json`
  a.click()
  URL.revokeObjectURL(url)
}

function triggerImport() {
  fileInput.value?.click()
}
function onFile(e) {
  const file = e.target.files?.[0]
  if (!file) return
  const reader = new FileReader()
  reader.onload = () => {
    try {
      importJSON(reader.result)
      importMsg.value = 'Importen lyckades ✓'
    } catch (err) {
      importMsg.value = 'Kunde inte läsa filen — kontrollera att det är en giltig backup.'
    }
    setTimeout(() => (importMsg.value = ''), 4000)
  }
  reader.readAsText(file)
  e.target.value = ''
}

function confirmReset() {
  if (confirm('Nollställa all avbockad träning? Detta går inte att ångra.')) resetAll()
}
</script>

<template>
  <div class="page safe-top">
    <h1>Statistik</h1>

    <div class="hero card">
      <div class="ring" :style="{ '--pct': stats.pct }">
        <span class="ring-num">{{ stats.pct }}%</span>
      </div>
      <div class="hero-meta">
        <p class="hero-line"><b>{{ stats.totalDone }}</b> av {{ stats.totalScheduled }} pass avklarade</p>
        <p class="hero-sub">🔥 {{ stats.streak }} dagars streak</p>
      </div>
    </div>

    <div class="row-cards">
      <div class="card mini">
        <span class="mini-label">Gympass</span>
        <span class="mini-num">{{ stats.doneGym }}/{{ stats.scheduledGym }}</span>
      </div>
      <div class="card mini">
        <span class="mini-label">Core-pass</span>
        <span class="mini-num">{{ stats.doneCore }}/{{ stats.scheduledCore }}</span>
      </div>
    </div>

    <h3 class="section-title">Per fas</h3>
    <div class="card phase-list">
      <div v-for="p in [1,2,3,4]" :key="p" class="phase-row">
        <div class="phase-row-top">
          <span class="phase-dot" :style="{ background: `var(--core${p})` }" />
          <span class="phase-name">{{ PHASE_INFO[p].name }}</span>
          <span class="phase-count">{{ perPhase[p].done }}/{{ perPhase[p].scheduled }}</span>
        </div>
        <div class="phase-bar"><div class="phase-fill" :style="{ width: (perPhase[p].scheduled ? perPhase[p].done / perPhase[p].scheduled * 100 : 0) + '%', background: `var(--core${p})` }" /></div>
      </div>
    </div>

    <h3 class="section-title">Backup</h3>
    <p class="hint">All data sparas lokalt i telefonens webbläsare. Exportera regelbundet om du vill kunna återställa den om du byter telefon eller rensar webbläsardata.</p>
    <div class="backup-actions">
      <button class="btn" @click="download">Exportera progress</button>
      <button class="btn" @click="triggerImport">Importera progress</button>
      <input ref="fileInput" type="file" accept="application/json" class="hidden-input" @change="onFile" />
    </div>
    <p v-if="importMsg" class="import-msg">{{ importMsg }}</p>

    <button class="btn danger-link" @click="confirmReset">Nollställ all avbockad träning</button>
  </div>
</template>

<style scoped>
.page { padding: 14px 14px 32px; }
h1 { font-size: 20px; font-weight: 800; margin-bottom: 14px; }

.hero { padding: 18px; display: flex; align-items: center; gap: 16px; }
.ring {
  --pct: 0;
  width: 74px; height: 74px; border-radius: 999px; flex-shrink: 0;
  background: conic-gradient(var(--accent) calc(var(--pct) * 1%), var(--bg-inset) 0);
  display: flex; align-items: center; justify-content: center;
  position: relative;
}
.ring::before { content: ''; position: absolute; inset: 6px; border-radius: 999px; background: var(--bg-elevated); }
.ring-num { position: relative; font-size: 15px; font-weight: 800; }
.hero-line { font-size: 14px; }
.hero-sub { font-size: 13px; color: var(--text-dim); margin-top: 4px; }

.row-cards { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-top: 12px; }
.mini { padding: 14px; display: flex; flex-direction: column; gap: 4px; }
.mini-label { font-size: 11.5px; color: var(--text-dim); font-weight: 700; }
.mini-num { font-size: 19px; font-weight: 800; }

.section-title { font-size: 13px; font-weight: 800; color: var(--text-dim); text-transform: uppercase; letter-spacing: 0.03em; margin: 22px 0 8px; }

.phase-list { padding: 6px 16px; }
.phase-row { padding: 10px 0; border-top: 1px solid var(--border); }
.phase-row:first-child { border-top: none; }
.phase-row-top { display: flex; align-items: center; gap: 8px; margin-bottom: 6px; }
.phase-dot { width: 8px; height: 8px; border-radius: 999px; flex-shrink: 0; }
.phase-name { font-size: 13px; font-weight: 700; flex: 1; }
.phase-count { font-size: 12px; color: var(--text-dim); font-weight: 700; }
.phase-bar { height: 5px; border-radius: 999px; background: var(--bg-inset); overflow: hidden; }
.phase-fill { height: 100%; border-radius: 999px; }

.hint { font-size: 12px; color: var(--text-dim); line-height: 1.5; margin-bottom: 10px; }
.backup-actions { display: flex; gap: 8px; }
.backup-actions .btn { flex: 1; }
.hidden-input { display: none; }
.import-msg { font-size: 12px; margin-top: 8px; color: var(--success); }

.danger-link {
  display: block; width: 100%; margin-top: 26px; border: none; background: none;
  color: var(--danger); font-size: 12.5px; text-decoration: underline;
}
</style>
