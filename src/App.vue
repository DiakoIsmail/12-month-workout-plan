<script setup>
import { RouterView, RouterLink, useRoute, useRouter } from 'vue-router'
import { resolveTodayTarget } from './data/calendar.js'
import { useRegisterSW } from 'virtual:pwa-register/vue'

const route = useRoute()
const router = useRouter()

function goToday() {
  router.push({ name: 'day', params: { date: resolveTodayTarget() } })
}

const { needRefresh, updateServiceWorker } = useRegisterSW({
  onRegisteredSW(_url, registration) {
    // Kolla efter ny version med jämna mellanrum medan appen är öppen
    registration && setInterval(() => registration.update(), 60 * 60 * 1000)
  },
})
function reload() {
  updateServiceWorker(true)
}
</script>

<template>
  <main class="main scrollbar-hidden">
    <RouterView v-slot="{ Component }">
      <transition name="fade" mode="out-in">
        <component :is="Component" />
      </transition>
    </RouterView>
  </main>

  <transition name="fade">
    <div v-if="needRefresh" class="update-toast">
      <span>Ny version tillgänglig</span>
      <button class="btn btn-primary" @click="reload">Uppdatera</button>
    </div>
  </transition>

  <nav class="tabbar safe-bottom">
    <RouterLink to="/" class="tab" :class="{ active: route.name === 'calendar' }">
      <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M8 3v4M16 3v4M3 10h18"/></svg>
      <span>Kalender</span>
    </RouterLink>
    <button class="tab" :class="{ active: route.name === 'day' }" @click="goToday">
      <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 3"/></svg>
      <span>Idag</span>
    </button>
    <RouterLink to="/stats" class="tab" :class="{ active: route.name === 'stats' }">
      <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 20V10M12 20V4M20 20v-7"/></svg>
      <span>Statistik</span>
    </RouterLink>
    <RouterLink to="/info" class="tab" :class="{ active: route.name === 'info' }">
      <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 8h.01M11 12h1v5h1"/></svg>
      <span>Info</span>
    </RouterLink>
  </nav>
</template>

<style scoped>
.main {
  flex: 1;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
}

.update-toast {
  position: sticky;
  bottom: 0;
  margin: 0 12px 10px;
  padding: 10px 10px 10px 14px;
  background: var(--bg-elevated);
  border: 1px solid var(--border);
  border-radius: var(--radius-sm);
  box-shadow: var(--shadow);
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  font-size: 13px;
  font-weight: 600;
}

.tabbar {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  border-top: 1px solid var(--border);
  background: var(--bg-elevated);
  position: sticky;
  bottom: 0;
}
.tab {
  appearance: none;
  background: none;
  border: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3px;
  padding: 9px 4px 8px;
  color: var(--text-dim);
  font-size: 11px;
  font-weight: 600;
  cursor: pointer;
}
.tab.active {
  color: var(--accent);
}

.fade-enter-active, .fade-leave-active { transition: opacity 0.12s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
</style>
