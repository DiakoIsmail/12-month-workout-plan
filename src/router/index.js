import { createRouter, createWebHashHistory } from 'vue-router'
import CalendarView from '../views/CalendarView.vue'
import DayDetailView from '../views/DayDetailView.vue'
import StatsView from '../views/StatsView.vue'
import InfoView from '../views/InfoView.vue'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'calendar', component: CalendarView },
    { path: '/day/:date', name: 'day', component: DayDetailView, props: true },
    { path: '/stats', name: 'stats', component: StatsView },
    { path: '/info', name: 'info', component: InfoView },
  ],
  scrollBehavior() {
    return { top: 0 }
  },
})

export default router
