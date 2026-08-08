// Övningsdata — transkriberat från "Kombinerad Träningskalender" PDF (sid 2–9)
// Gym Split (D1–D4) + Ab & Core (Fas 1–4)

export const GYM_SESSIONS = {
  D1: {
    id: 'D1',
    title: 'D1 — Ben & Axlar',
    subtitle: 'Gym · Måndag',
    color: 'gym1',
    isLegDay: true,
    exercises: [
      { name: 'Knäböj', scheme: '4 × 8–10', note: 'Fötterna axelbrett, knän i linje med tårna. Gå ner till minst 90°. Håll ryggen rak och bröst uppåt.' },
      { name: 'Bänkpress för ben (Leg press)', scheme: '4 × 10–12', note: 'Fötterna högt på plattan för mer gluteus. Pressa igenom hälarna, lås inte knäna överst.' },
      { name: 'Rumänsk marklyft (RDL)', scheme: '3 × 10', note: 'Hantelarna nära benen hela vägen. Känn sträcket i baksida lår. Lätt böj i knäna.' },
      { name: 'Utfallssteg', scheme: '3 × 12/ben', note: 'Ta ett stort steg fram. Bakre knät mot golvet. Håll överkroppen upprätt.' },
      { name: 'Militärpress', scheme: '4 × 8–10', note: 'Stående eller sittande. Pressa rakt upp, undvik att luta ryggen bakåt. Sänk kontrollerat.' },
      { name: 'Lateral raise', scheme: '3 × 12–15', note: 'Lätt böj i armbågarna. Lyft till axelhöjd, inte högre. Kontrollera nedsänkningen.' },
      { name: 'Front raise', scheme: '3 × 12', note: 'Växelvis eller simultant. Lyft till ögonhöjd. Undvik att svänga med kroppen.' },
      { name: 'Face pull', scheme: '3 × 15', note: 'Kabeln i ögonhöjd. Dra mot ansiktet med armbågarna ut. Bra för rotatorkuffen.' },
    ],
  },
  D2: {
    id: 'D2',
    title: 'D2 — Bröst / Biceps / Triceps',
    subtitle: 'Gym · Onsdag',
    color: 'gym2',
    isLegDay: false,
    exercises: [
      { name: 'Bänkpress', scheme: '4 × 8–10', note: 'Skulderbladen ihop och nerdragna. Sänk stången till nedre bröstkorgen. Pressa explosivt upp.' },
      { name: 'Lutande hantelpress', scheme: '3 × 10', note: '30–45° lutning. Belastar övre bröstkorgen mer. Håll armbågarna ca 45° från kroppen.' },
      { name: 'Kabelflyingar', scheme: '3 × 12–15', note: 'Lätt böj i armbågarna hela rörelsen. Känn bröstmuskeln jobba i topp. Kontrollera tillbaka.' },
      { name: 'Dips (bröst)', scheme: '3 × max', note: 'Luta dig lätt framåt för mer bröst. Gå ner tills axlarna är under armbågarna.' },
      { name: 'Skivstångs-curl', scheme: '4 × 10–12', note: 'Armbågarna fixerade mot sidorna. Full extension nertill. Krama bicepsen i topp.' },
      { name: 'Hammarcurl', scheme: '3 × 12/arm', note: 'Neutralt grepp (tummen upp). Tränar brachialis och brachioradialis. Alternera armarna.' },
      { name: 'Triceps pushdown', scheme: '4 × 12–15', note: 'Armbågarna vid sidorna. Full extension i botten. Känn tricepsen jobba hela vägen.' },
      { name: 'Skull crushers', scheme: '3 × 12', note: 'Ligg på bänk. Sänk stången mot pannan med kontroll. Lyft upp genom att sträcka armbågarna.' },
    ],
  },
  D3: {
    id: 'D3',
    title: 'D3 — Ben & Axlar',
    subtitle: 'Gym · Torsdag',
    color: 'gym3',
    isLegDay: true,
    exercises: [
      { name: 'Frontböj', scheme: '4 × 8', note: 'Stången på framsidan av axlarna. Kräver god rörlighet. Mer fokus på quads och core än bakböj.' },
      { name: 'Bulgarian split squat', scheme: '4 × 10/ben', note: 'Bakre foten upp på bänk. Djup i knäet framåt. Utmärkt för ensidig benstyrka och balans.' },
      { name: 'Liggande bencurl', scheme: '4 × 12', note: 'Full extension och full böjning. Håll höfterna pressade mot kudden. Kontrollera nedsänkning.' },
      { name: 'Kalvhöjningar', scheme: '4 × 15–20', note: 'Full ROM — helt ner på hälen, helt upp på tå. Gå långsamt. Kan göras en fot i taget.' },
      { name: 'Arnold press', scheme: '4 × 10', note: 'Börja med hantelarna framåt (som curl-topp). Rotera och pressa upp. Tränar alla tre deltar.' },
      { name: 'Upright row', scheme: '3 × 12', note: 'Smalt grepp, dra upp till hakan. Armbågarna leder rörelsen uppåt. Bra för trap och lateral.' },
      { name: 'Rear delt fly', scheme: '3 × 15', note: 'Förovärböjd eller i kabeln. Lyft armarna ut åt sidan. Krama bakre deltat ihop i topp.' },
      { name: 'Shrugs', scheme: '3 × 15', note: 'Tunga hantlar eller skivstång. Lyft axlarna rakt upp — ingen rotation. Håll 1 sek i topp.' },
    ],
  },
  D4: {
    id: 'D4',
    title: 'D4 — Rygg',
    subtitle: 'Gym · Lördag',
    color: 'gym4',
    isLegDay: false,
    exercises: [
      { name: 'Marklyft', scheme: '4 × 5', note: 'Ryggen rak, bröst upp. Skivstången nära benen hela vägen. Det tyngsta och viktigaste ryggövningen.' },
      { name: 'Chins / Pull-ups', scheme: '4 × max', note: 'Full extension nertill. Dra till bröstkorgen, inte hakan. Undvid att svänga. Lägg till vikt när det lossnar.' },
      { name: 'Sittande rodd', scheme: '4 × 10–12', note: 'Dra till naveln. Armbågarna nära kroppen. Krama skulderbladen ihop i slutpositionen.' },
      { name: 'T-bar rodd', scheme: '3 × 10', note: 'Förovärböjd ca 45°. Dra till nedre bröstkorgen. Bra för tjocklek i mitten av ryggen.' },
      { name: 'Lat pulldown', scheme: '3 × 12', note: 'Brett grepp. Dra till övre bröstkorgen. Luta dig lätt bakåt. Känn latsen jobba.' },
      { name: 'Enarms hantelrodd', scheme: '3 × 12/arm', note: 'Knä och hand på bänken. Dra hanteln mot höften. Full ROM — sträck latsen nertill.' },
      { name: 'Facepull', scheme: '3 × 15', note: 'Kabeln i ögonhöjd. Dra mot ansiktet, armbågarna ut. Rotatorkuff och bakre delta.' },
      { name: 'Raka marklyft (rack pulls)', scheme: '3 × 6', note: 'Börja i knähöjd. Fokus på övre rygg och trap. Tyngre än vanligt marklyft.' },
    ],
  },
}

// Core-program: 4 faser, varje fas har Pass 1–4 (Fas 4 har även ett 5:e "Skill"-pass på lördagar)
export const CORE_PHASES = {
  1: {
    id: 1,
    title: 'Fas 1 — Foundation',
    days: 'Mån/Ons/Fre',
    color: 'core1',
    passes: {
      p1: {
        id: 'p1', title: 'Pass 1 — Deep core & stabilitet', weekday: 'Måndag',
        exercises: [
          { name: 'Dead bug', scheme: '3 × 10', note: 'Ligg på rygg, armar upp. Sänk motsat arm+ben mot golvet utan att ryggen lyfter. Håll lägre ryggen pressad mot golvet hela tiden.' },
          { name: 'Bird dog', scheme: '3 × 10/sida', note: 'På alla fyra. Sträck motsat arm och ben simultant. Håll höfterna parallella — ingen rotation. 2 sek håll i topp.' },
          { name: 'Plankan', scheme: '3 × 20–30s', note: 'Armbågarna under axlarna. Kroppen rak som en planka. Pressa naveln mot ryggraden. Andas normalt.' },
          { name: 'Hollow body hold', scheme: '3 × 15s', note: 'Ligg på rygg. Lyft axlar och ben från golvet. Lägre rygg ALLTID i kontakt med golvet. Armarna sträckta bakom huvudet.' },
          { name: 'Glute bridge', scheme: '3 × 15', note: 'Ligg på rygg, fötterna platta. Pressa höfterna upp, kläm ihop sätet i topp. Håll 1 sek. Aktiverar gluteus och stabiliserar ländryggen.' },
        ],
      },
      p2: {
        id: 'p2', title: 'Pass 2 — Flexion & rotation', weekday: 'Onsdag',
        exercises: [
          { name: 'Crunch', scheme: '3 × 12', note: 'Händerna bakom öronen, inte nacken. Lyft axlarna från golvet — inte hela ryggen. Andas ut vid kontraktion.' },
          { name: 'Bicycle crunch', scheme: '3 × 12/sida', note: 'Rotera och dra motsat armbåge mot knät. Sträck det andra benet. Full rotation — känn obliquerna jobba.' },
          { name: 'Russian twist', scheme: '3 × 10/sida', note: 'Sitta med benen lätt lyftade. Rotera överkroppen sida till sida. Håll ryggen rak, ej rundad.' },
          { name: 'Reverse crunch', scheme: '3 × 12', note: 'Ligg på rygg. Lyft knäna mot bröstet med en höftkrullning — inte bara benlyft. Kontrollera nedsänkningen.' },
          { name: 'Sidoplanka', scheme: '3 × 15s/sida', note: 'Armbågen under axeln. Höfterna upp, kroppen rak. Undvik att sjunka i midjan.' },
        ],
      },
      p3: {
        id: 'p3', title: 'Pass 3 — Full core circuit', weekday: 'Fredag',
        exercises: [
          { name: 'Plankan', scheme: '3 × 30s', note: 'Fokus på att pressa naveln upp mot ryggraden. Andas djupt och kontrollerat. Öka tid med 5s varje vecka.' },
          { name: 'Dead bug', scheme: '2 × 12', note: 'Som Pass 1 men med lite mer kontroll och långsammare tempo. 3 sek ner, 1 sek håll.' },
          { name: 'Bicycle crunch', scheme: '3 × 15/sida', note: 'Högre repetitioner än Pass 2. Håll tempot jämnt — kvalitet framför hastighet.' },
          { name: 'Hollow body hold', scheme: '3 × 20s', note: 'Öka håll-tid med 5s från Pass 1. Armarna kan hållas vid sidorna om det är för svårt.' },
          { name: 'Bird dog', scheme: '2 × 12/sida', note: 'Avslutande stabiliseringsövning. Full kontroll. Inga ryckrörelser.' },
        ],
      },
    },
  },
  2: {
    id: 2,
    title: 'Fas 2 — Strength',
    days: 'Mån/Tis/Tor/Fre',
    color: 'core2',
    passes: {
      p1: {
        id: 'p1', title: 'Pass 1 — Weighted core', weekday: 'Måndag',
        exercises: [
          { name: 'Weighted crunch', scheme: '4 × 12', note: 'Håll en skiva eller hantel mot bröstet. Samma teknik som vanlig crunch men med motstånd. Öka vikt var 2:e vecka.' },
          { name: 'Cable crunch', scheme: '4 × 15', note: 'Knäböj framför kabeln. Dra ner med nacken/axlarna, inte med höfterna. Känn magmuskeln krulla ihop överkroppen.' },
          { name: 'Weighted plankan', scheme: '3 × 45s', note: 'Be någon lägga en skiva på ryggen, eller använd en ryggsäck. Behåll perfekt form — ingen kompromiss.' },
          { name: 'Ab wheel rollout', scheme: '3 × 8', note: 'Börja på knäna. Rulla ut tills ryggen nästan är parallell med golvet. Dra tillbaka med magmuskeln. ALDRIG sjunka i ländryggen.' },
          { name: 'Benlyft (leg raise)', scheme: '3 × 12', note: 'Ligg på rygg, händerna under sätet. Lyft benen till 90°. Sänk kontrollerat utan att ryggen lyfter.' },
        ],
      },
      p2: {
        id: 'p2', title: 'Pass 2 — Anti-rotation', weekday: 'Tisdag',
        exercises: [
          { name: 'Pallof press', scheme: '3 × 12/sida', note: 'Stå sidledes mot kabeln. Pressa rakt ut och håll 2 sek. Motstå rotationen. Kärnstabilisering på hög nivå.' },
          { name: 'Copenhagen plankan', scheme: '3 × 20s/sida', note: 'Sida på bänk, övre foten på kanten. Lyft höfterna upp. Kräver stark adduktor och sidostabilitet.' },
          { name: 'Suitcase carry', scheme: '3 × 20m/sida', note: 'Bär en tung hantel i EN hand. Håll kroppen perfekt upprätt — motstå sidolutningen. Bra för obliqua och quadratus lumborum.' },
          { name: 'Cable woodchop', scheme: '3 × 12/sida', note: 'Kabeln högt. Dra diagonalt nedåt med rotation. Kontrollera hela rörelsen. Tränar rotationskedjan.' },
          { name: 'Sidoplanka med höftdip', scheme: '3 × 15/sida', note: 'Vanlig sidoplanka, sänk sedan höften mot golvet och lyft upp igen. Aktiv rörelse i obliquerna.' },
        ],
      },
      p3: {
        id: 'p3', title: 'Pass 3 — Hanging & flexion', weekday: 'Torsdag',
        exercises: [
          { name: 'Hanging knee raise', scheme: '4 × 12', note: 'Häng i stång. Lyft knäna mot bröstet med en höftkrullning. Sväng inte. Sänk kontrollerat.' },
          { name: 'Toes-to-bar (assisterad)', scheme: '3 × 8', note: 'Häng i stång. Lyft tårna mot stången. Börja med böjda knän om det är för svårt. Känn rectus abdominis jobba.' },
          { name: 'Decline crunch', scheme: '4 × 15', note: 'På lutad bänk, fötterna högt. Full ROM — sträck ut i botten och krul ihop i topp. Tyngre än vanlig crunch.' },
          { name: 'Dragon flag (negativ)', scheme: '3 × 6', note: 'Ligg på bänk, ta tag bakom huvudet. Lyft kroppen rakt upp (med hjälp), sänk kontrollerat som en planka. Det svåraste core-övningen.' },
          { name: 'Plank up-down', scheme: '3 × 10', note: 'Börja i armbågsplanka. Tryck upp till handsplanka en arm i taget. Håll höfterna stabila — ingen rotation.' },
        ],
      },
      p4: {
        id: 'p4', title: 'Pass 4 — Full power circuit', weekday: 'Fredag',
        exercises: [
          { name: 'Ab wheel', scheme: '4 × 10', note: 'Nu från knäna med mer kontroll. Sikta på full utsträckning. Dra tillbaka explosivt med magmuskeln.' },
          { name: 'Weighted side bend', scheme: '3 × 15/sida', note: 'En hantel i handen. Böj i sidan, sträck ut ordentligt i topp. Tränar quadratus lumborum och obliqua.' },
          { name: 'Hanging leg raise', scheme: '3 × 10', note: 'Uppgradering från knee raise — nu med raka ben. Lyft till 90° eller högre. Kontrollerat ner.' },
          { name: 'Pallof press', scheme: '3 × 12/sida', note: 'Som Pass 2 men med tyngre motstånd nu. Fokus på att hålla perfekt upprätt position.' },
          { name: 'Hollow body rock', scheme: '3 × 30s', note: 'Från hollow hold — vagga fram och tillbaka med kontroll. Håll formen hela tiden. Avancerad kärnstabilisering.' },
        ],
      },
    },
  },
  3: {
    id: 3,
    title: 'Fas 3 — Power',
    days: 'Mån/Tis/Tor/Fre',
    color: 'core3',
    passes: {
      p1: {
        id: 'p1', title: 'Pass 1 — Power & speed', weekday: 'Måndag',
        exercises: [
          { name: 'Medicine ball slam', scheme: '4 × 10', note: 'Lyft bollen över huvudet, slam ner explosivt. Använd hela kroppen. Viktigt: böj knäna vid uppsamling.' },
          { name: 'V-up', scheme: '4 × 15', note: 'Ligg utsträckt. Lyft armar och ben simultant mot varandra i ett V. Full extension i botten. Explosivt upp.' },
          { name: 'Explosive plank reach', scheme: '3 × 10/sida', note: 'I handsplanka, lyft en hand explosivt framåt. Håll höfterna stabila. Tränar snabbkraft i kärnan.' },
          { name: 'Dragon flag', scheme: '4 × 5', note: 'Nu fulla reps — upp och ner kontrollerat. Om 5 ej möjligt: kör 3 fulla + 2 negativa. Kvalitet alltid.' },
          { name: 'Toes-to-bar', scheme: '4 × 12', note: 'Nu utan assistans. Fokus på kraft i magmuskeln, inte svängkraft. Kontrollera nedsänkning.' },
        ],
      },
      p2: {
        id: 'p2', title: 'Pass 2 — Rotational power', weekday: 'Tisdag',
        exercises: [
          { name: 'Med ball rot throw', scheme: '4 × 10/sida', note: 'Stå sidledes mot en vägg. Kasta bollen explosivt med rotation. Maximal rotationskraft.' },
          { name: 'Cable woodchop (snabbt)', scheme: '3 × 15/sida', note: 'Som Fas 2 men med snabbare kontraktion. Explosivt ner, kontrollerat tillbaka.' },
          { name: 'Landmine twist', scheme: '3 × 12/sida', note: 'Skivstångände i hörn. Håll i båda händer, rotera från sida till sida. Fantastisk för obliquerna.' },
          { name: 'Copenhagen plankan', scheme: '3 × 30s/sida', note: 'Längre håll-tid nu. Om lätt — lägg till ett höftdip per 5 sek.' },
          { name: 'Russian twist (med vikt)', scheme: '4 × 15/sida', note: 'Nu med medicinboll eller skiva. Fötterna kan lyftas för svårare variant.' },
        ],
      },
      p3: {
        id: 'p3', title: 'Pass 3 — Compound styrka', weekday: 'Torsdag',
        exercises: [
          { name: 'Marklyft', scheme: '4 × 5', note: 'Core-övning nummer ett. Brace ordentligt — ta ett djupt andetag, håll, lyft. Ryggen rak hela vägen.' },
          { name: 'Ab wheel stående', scheme: '4 × 8', note: 'Nu från stående position! Rulla ut mot golvet, håll 1 sek, dra tillbaka. Extremt svårt — bygg upp gradvis.' },
          { name: 'L-sit (parallellbommar)', scheme: '4 × 10s', note: 'Pressa upp i dips-position, lyft benen till 90°. Håll. Bygger enormt core och höftböjar-styrka.' },
          { name: 'Weighted hanging raise', scheme: '4 × 10', note: 'Hantel mellan fötterna eller viktbälte. Annars som Fas 2. Full ROM.' },
          { name: 'Suitcase DL carry', scheme: '3 × 30m/sida', note: 'Lyft en tung hantel som ett enkelsidigt marklyft, bär sedan 30m. Extremt funktionell core-styrka.' },
        ],
      },
      p4: {
        id: 'p4', title: 'Pass 4 — Endurance circuit', weekday: 'Fredag',
        exercises: [
          { name: 'Plankan', scheme: '2 × 3 min', note: 'Nu 3 minuter sammanhängande. Fokus på andning. Om du tappar formen — avbryt, vila 30 sek, fortsätt.' },
          { name: 'Hollow body rock', scheme: '3 × 45s', note: 'Håll formen längre nu. Om du tappar kontakt med golvet — stanna och återställ positionen.' },
          { name: 'Dragon flag', scheme: '3 × 6', note: 'Sex rena reps. Ingen svängning. Kontrollerat ner, explosivt upp.' },
          { name: 'V-up', scheme: '3 × 20', note: 'Högre reps nu. Håll tempot jämnt. Undvik att studsa i botten — kontrollera hela rörelsen.' },
          { name: 'Med ball slam', scheme: '3 × 12', note: 'Avslutande explosiv övning. Max kraft på varje rep.' },
        ],
      },
    },
  },
  4: {
    id: 4,
    title: 'Fas 4 — Peak',
    days: 'Mån/Tis/Ons/Fre/Lör',
    color: 'core4',
    passes: {
      p1: {
        id: 'p1', title: 'Pass 1 — Skill & styrka', weekday: 'Måndag',
        exercises: [
          { name: 'Front lever hold', scheme: '5 × 5s', note: 'Häng i stång, kroppen horisontell och rak. Börja med tucked (knän mot bröstet) och bygg ut gradvis. Extremt avancerat.' },
          { name: 'Dragon flag', scheme: '5 × 8', note: 'Nu 8 rena reps. Kroppen som en planka hela vägen. Om form bryts — stoppa setet.' },
          { name: 'L-sit', scheme: '5 × 15s', note: 'Längre håll nu. Benen raka, tårna pekande framåt. Pressa ner i bommarna och lyft upp.' },
          { name: 'Weighted ab wheel', scheme: '4 × 10', note: 'Viktväst eller ryggsäck med vikt. Ab wheel från stående. Det svåraste ab wheel-varianten.' },
          { name: 'Toes-to-bar', scheme: '4 × 15', note: '15 kontrollerade reps. Inga svängningar. Varje rep börjar från full extension.' },
        ],
      },
      p2: {
        id: 'p2', title: 'Pass 2 — Rotational peak', weekday: 'Tisdag',
        exercises: [
          { name: 'Heavy landmine twist', scheme: '4 × 10/sida', note: 'Maximal vikt du kan kontrollera. Full rotation med kontroll. Kraft och stabilitet simultant.' },
          { name: 'Med ball slam', scheme: '5 × 12', note: 'Maximal explosivitet på varje rep. Vila 60 sek mellan seten.' },
          { name: 'Cable woodchop max', scheme: '4 × 15/sida', note: 'Tyngsta kabelvikten med full kontroll. Explosivt ner, kontrollerat tillbaka.' },
          { name: 'Copenhagen plankan', scheme: '4 × 45s/sida', note: 'Nära maximal håll-tid. Lägg till viktväst för extra utmaning.' },
          { name: 'Pallof press ISO hold', scheme: '4 × 30s/sida', note: 'Pressa ut och HÅLL 30 sek. Maximal antirotationsstyrka. Tyngre kabel än Fas 2–3.' },
        ],
      },
      p3: {
        id: 'p3', title: 'Pass 3 — Compound integration', weekday: 'Onsdag',
        exercises: [
          { name: 'Marklyft', scheme: '5 × 3', note: 'Nu på maxvikt — 3 tunga reps. Varje lyft ska vara perfekt. Vila 3–4 min mellan set.' },
          { name: 'Knäböj (tungt)', scheme: '4 × 5', note: 'Tungt och kontrollerat. Core-brace är avgörande vid maxvikter. Djup squatposition.' },
          { name: 'Suitcase carry', scheme: '4 × 40m/sida', note: 'Tyngre vikt längre sträcka. En av de mest funktionella core-övningarna som finns.' },
          { name: 'Ab wheel stående (weighted)', scheme: '4 × 10', note: 'Viktväst på. Full ROM. Det absolut tuffaste ab-övningen i programmet.' },
          { name: 'Dragon flag', scheme: '3 × 6', note: 'Avslutande dragon flags. Trots trötthet — håll formen. Hellre 4 bra reps än 6 dåliga.' },
        ],
      },
      p4: {
        id: 'p4', title: 'Pass 4 — Power endurance', weekday: 'Fredag',
        exercises: [
          { name: 'V-up tabata', scheme: '8 × 20s/10s', note: '20 sek max reps, 10 sek vila, 8 varv. Totalt 4 min. Brutal men effektiv.' },
          { name: 'Hollow body rock', scheme: '4 × 60s', note: '60 sekunder sammanhängande. Om formen bryts — byt till hollow hold tills du kan fortsätta rocka.' },
          { name: 'Med ball rot slam', scheme: '4 × 10/sida', note: 'Kombinera rotation och slam. Diagonalt ner mot golvet med full kraft.' },
          { name: 'Hanging raise (weighted)', scheme: '4 × 12', note: 'Viktbälte med 10kg. Full ROM. Kontrollera varje rep.' },
          { name: 'L-sit max hold', scheme: '3 × max', note: 'Gå till failure varje set. Vila 90 sek. Notera din bästa tid — det är ditt framstegsmått.' },
        ],
      },
      p5: {
        id: 'p5', title: 'Pass 5 — Skill (Lördag)', weekday: 'Lördag',
        note: 'Källkalendern anger ett extra skicklighetspass på lördagar i Fas 4 men listar inga egna övningar för det — använd Pass 1 (Skill & styrka) som riktlinje och fokusera på de moment du vill utveckla mest (front lever, L-sit eller dragon flag).',
        exercises: [
          { name: 'Front lever hold', scheme: '3 × 5s', note: 'Skicklighetsfokus — samma teknik som Pass 1. Bygg ut gradvis från tucked position.' },
          { name: 'L-sit', scheme: '3 × 15s', note: 'Skicklighetsfokus — samma teknik som Pass 1. Benen raka, tårna pekande framåt.' },
          { name: 'Dragon flag', scheme: '3 × 8', note: 'Skicklighetsfokus — samma teknik som Pass 1. Kroppen som en planka hela vägen.' },
        ],
      },
    },
  },
}

export function getGym(id) {
  return id ? GYM_SESSIONS[id] : null
}

export function getCorePass(phase, passId) {
  const ph = CORE_PHASES[phase]
  if (!ph) return null
  return ph.passes[passId] || null
}
