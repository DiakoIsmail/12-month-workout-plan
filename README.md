# 12-month-workout-plan

En Vue 3-app (PWA) för "Kombinerad Träningskalender": Gym Split 4 dagar + Ab & Core-program,
10 aug 2026 – 10 aug 2027. Bocka av varje gympass och core-pass direkt i kalendern — allt sparas
lokalt på din telefon (localStorage), ingen server eller inloggning behövs.

**Live:** https://diakoismail.github.io/12-month-workout-plan/

## Funktioner

- 📅 Hel 12-månaderskalender, genererad från programmets veckomönster (4 faser × 13 veckor,
  med deload var 4:e vecka och testdagar automatiskt utsatta).
- ✅ Bocka av varje övning eller ett helt pass som klart — sparas i `localStorage` på enheten.
- 📊 Statistik: andel avklarat, streak, uppdelat per fas.
- 💾 Export/import av din progress som JSON-backup.
- 📱 Progressive Web App — går att installera på hemskärmen och fungerar offline.
- 🌗 Ljust/mörkt tema efter systeminställning.

## Utveckling

```bash
npm install
npm run dev       # lokal dev-server
npm run build     # produktionsbygge till dist/
npm run preview   # förhandsgranska produktionsbygget
```

## Deploy till GitHub Pages

Deploy sker automatiskt via GitHub Actions (`.github/workflows/deploy.yml`) vid varje push till
`main`. Pages-källan är satt till **GitHub Actions** i repots inställningar (Settings → Pages).

Om du byter repo-namn eller användarnamn, uppdatera `base` i [vite.config.js](vite.config.js)
så att den matchar `/<repo-namn>/`.

## Data & integritet

All avbockad träning sparas enbart lokalt i webbläsaren (`localStorage`, nyckel `wp-progress-v1`).
Inget skickas till någon server. Exportera en JSON-backup då och då under **Statistik**-fliken
om du vill kunna återställa datan på en ny enhet.

## Källa

Övningar, scheman och kalenderlogik är transkriberade/härledda från PDF:en
*"Kombinerad Träningskalender — Gym Split + Ab & Core"* (v3, 2026–2027).
