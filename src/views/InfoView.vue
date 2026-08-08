<script setup>
import { computed } from 'vue'
import { getPhaseDateRanges, PHASE_INFO, PROGRAM_START, CALENDAR_END, MONTH_NAMES } from '../data/calendar.js'

const ranges = getPhaseDateRanges()

function fmt(iso) {
  const [y, m, d] = iso.split('-').map(Number)
  return `${d} ${MONTH_NAMES[m - 1].slice(0, 3).toLowerCase()} ${y}`
}

const schedule = [
  { day: 'Måndag', gym: 'Gym D1 — Ben & Axlar', core: 'Core (varierar per fas)', note: 'Kör core efter gymmet' },
  { day: 'Tisdag', gym: 'Vila efter benpass', core: 'Core (Fas 2–4)', note: 'Core OK — inte gym' },
  { day: 'Onsdag', gym: 'Gym D2 — Bröst/Bi/Tri', core: 'Core (Fas 1 & 4)', note: 'Core efter gymmet' },
  { day: 'Torsdag', gym: 'Gym D3 — Ben & Axlar', core: 'Core (Fas 2–3)', note: 'Kör core efter gymmet' },
  { day: 'Fredag', gym: 'Vila efter benpass', core: 'Core (alla faser)', note: 'Core OK — inte gym' },
  { day: 'Lördag', gym: 'Gym D4 — Rygg', core: 'Core Skill (endast Fas 4)', note: 'Core efter gymmet' },
  { day: 'Söndag', gym: 'Vila / aktiv återhämtning', core: '—', note: 'Stretch, promenad' },
]

const tips = [
  'Kör alltid core-passet EFTER gymmet samma dag — aldrig före tunga benpass.',
  'Viladagarna (Tis & Fre) är kroppens återhämtning — kör gärna lätt stretching eller promenad.',
  'Deload-veckor: sänk volym 40% i BÅDA programmen, inte bara core.',
  'Mån + Tor är tuffast (ben + core) — prioritera sömn och protein dessa kvällar.',
]
</script>

<template>
  <div class="page safe-top">
    <h1>Om programmet</h1>
    <p class="lead">Gym Split 4 dagar + Ab &amp; Core-program · {{ fmt(PROGRAM_START) }} – {{ fmt(CALENDAR_END) }}</p>

    <h3 class="section-title">Veckoschema</h3>
    <div class="card">
      <div v-for="row in schedule" :key="row.day" class="sched-row">
        <span class="sched-day">{{ row.day }}</span>
        <span class="sched-gym">{{ row.gym }}</span>
        <span class="sched-note">{{ row.note }}</span>
      </div>
    </div>

    <h3 class="section-title">Faser (12 månader, 4 × 13 veckor)</h3>
    <div class="card phase-cards">
      <div v-for="p in [1,2,3,4]" :key="p" class="phase-card">
        <span class="phase-dot" :style="{ background: `var(--core${p})` }" />
        <div class="phase-body">
          <b>{{ PHASE_INFO[p].name }}</b>
          <span class="phase-dates" v-if="ranges[p]">{{ fmt(ranges[p].start) }} – {{ fmt(ranges[p].end) }}</span>
        </div>
      </div>
      <p class="phase-note">Deload-vecka (40% lägre volym) körs var 4:e vecka i Fas 2–4 (vecka 4, 8 och 12). Fas 1 har ingen deload. Testdagar (★) markerar kontrollpunkter efter 12, 24 och 36 veckor, samt ett sluttest 🏁 efter fullföljt program.</p>
    </div>

    <h3 class="section-title">Tips</h3>
    <div class="card">
      <div v-for="(t, i) in tips" :key="i" class="tip-row">
        <span class="tip-dot" />
        <span>{{ t }}</span>
      </div>
    </div>

    <h3 class="section-title">Om appen</h3>
    <div class="card about-card">
      <p>All avbockad träning sparas <b>lokalt i din telefons webbläsare</b> (localStorage) — inget skickas till någon server. Data finns kvar mellan besök, men försvinner om du rensar webbläsardata, så exportera gärna en backup ibland under <router-link to="/stats">Statistik</router-link>.</p>
      <p>Appen är en <b>PWA</b> — tryck på "Dela" → "Lägg till på hemskärmen" (iPhone) eller menyn → "Installera app" (Android/Chrome) för att använda den som en vanlig app, även utan internetuppkoppling.</p>
    </div>
  </div>
</template>

<style scoped>
.page { padding: 14px 14px 32px; }
h1 { font-size: 20px; font-weight: 800; }
.lead { font-size: 12.5px; color: var(--text-dim); margin-top: 4px; font-weight: 600; }

.section-title { font-size: 13px; font-weight: 800; color: var(--text-dim); text-transform: uppercase; letter-spacing: 0.03em; margin: 22px 0 8px; }

.sched-row {
  display: grid; grid-template-columns: 62px 1fr auto; gap: 8px; align-items: baseline;
  padding: 10px 16px; border-top: 1px solid var(--border); font-size: 12.5px;
}
.sched-row:first-child { border-top: none; }
.sched-day { font-weight: 800; }
.sched-gym { color: var(--text); }
.sched-note { color: var(--text-dim); font-size: 11px; text-align: right; white-space: nowrap; }

.phase-cards { padding: 4px 16px 14px; }
.phase-card { display: flex; align-items: center; gap: 10px; padding: 10px 0; border-top: 1px solid var(--border); }
.phase-card:first-child { border-top: none; }
.phase-dot { width: 10px; height: 10px; border-radius: 999px; flex-shrink: 0; }
.phase-body { display: flex; flex-direction: column; font-size: 13px; }
.phase-dates { font-size: 11.5px; color: var(--text-dim); margin-top: 1px; }
.phase-note { font-size: 11.5px; color: var(--text-dim); line-height: 1.5; padding-top: 8px; border-top: 1px solid var(--border); margin-top: 4px; }

.tip-row { display: flex; gap: 10px; padding: 10px 16px; border-top: 1px solid var(--border); font-size: 12.5px; line-height: 1.45; }
.tip-row:first-child { border-top: none; }
.tip-dot { width: 6px; height: 6px; border-radius: 999px; background: var(--accent); flex-shrink: 0; margin-top: 6px; }

.about-card { padding: 14px 16px; display: flex; flex-direction: column; gap: 10px; }
.about-card p { font-size: 12.5px; line-height: 1.55; color: var(--text-dim); }
.about-card a { color: var(--accent); font-weight: 700; text-decoration: underline; }
</style>
