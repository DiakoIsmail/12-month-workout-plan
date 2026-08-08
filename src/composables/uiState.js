import { ref } from 'vue'
import { getMonths, resolveTodayTarget } from '../data/calendar.js'

const months = getMonths()
const targetDate = resolveTodayTarget()
let initialIndex = months.findIndex((m) => m.days.some((d) => d.date === targetDate))
if (initialIndex < 0) initialIndex = 0

// Delat state (modul-singleton) så vald månad bevaras när man navigerar
// bort till en dagvy och sedan tillbaka till kalendern.
export const selectedMonthIndex = ref(initialIndex)
