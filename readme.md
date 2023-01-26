
# Vefforritun 2 2023, verkefni 1: Okkar eigin kennsluskrá

[Kynning í fyrirlestri](https://youtu.be/Mjrug2-LGfk).

## Markmið

- Upprifjun og notkun á verkfærum og tólum úr vefforritun 1.
- Ósamstillt forritun með Node.js og notkun á módúlum.
- Útbúa test með Jest og setja upp keyrslu á testum með GitHub Actions.
- Setja upp vef á Netlify með tengingu við GitHub.

## Verkefnið

[Á vef kennsluskrár HÍ er leit](https://ugla.hi.is/kennsluskra/index.php?tab=nam&chapter=leit) þar sem hægt er að sækja [CSV](https://en.wikipedia.org/wiki/Comma-separated_values) skrár með áföngum. Við ætlum að nota CSV gögn um áfanga til að byggja „okkar eigin kennsluskrá“.

Skrifa skal allan kóða, ekki skal nota forritasöfn frá t.d. NPM.

### Lestur gagna

Undir möppunni `data/` eru CSV skrár með áföngum í, ásamt stakri JSON skrá (`index.json`) með heiti deildar, lýsingu og heiti skráar sem inniheldur áfanga.

Hver CSV skrá byrjar á línu með dálkaheitum:

- Númer áfanga
- Heiti áfanga
- Einingafjöldi áfanga
- Kennslumisseri áfanga
- Námstig áfanga
- Ómerkt, en seinasti dálkur er slóð á kennsluskrá

Skrifa skal forrit sem les inn þessi gögn og varpar yfir í HTML skrár sem birta gögnin.

Ekki á að breyta skrám heldur nota þær nákvæmlega eins og þær eru.

Athugið að gögnin eru breytt frá þeim sem sótt eru frá kennsluskrá, athuga þarf:

- Ef áfangi á sér ekki heiti á ekki að birta hann.
- Fjöldi eininga þarf að vera tala á íslensku formi, þ.e.a.s. rauntala með kommu og ekki punkti. Ef svo er ekki skal ekki birta einingar.
- Kennslumisseri skal aðeins vera `Vor`, `Sumar` eða `Haust`.
- Ef námsstig er tómt skal ekki birta það.
- Aðeins skal nota slóð á kennsluskrá ef hún er gild slóð.
- Í gögnum geta verið auka tómar línur, línur með auka bilum innan dálka, línur með auka dálkum. Þessar línur skal birta ef gögn eru í grunninn í lagi og fylgja því sem kemur fram að ofan.

Eftir lestur skal útbúa HTML skrár sem birta gögnin. Þær skulu vera í möppunni `dist/` og hafa nafn sem samsvarar nafni á CSV skrá sem þær eru útbúnar úr ásamt `index.html` skrá sem birtir deildir og hlekkir yfir á áfangasíður, sjá nánar að neðan.

Þar sem gögn innan `dist/` möppu eru _afleidd_ frá því sem er í `data/` möppu skal **ekki** setja þær inn í Git og hunsa þær með `.gitignore` skrá.

### Test

Í verkefni skal skrifa test með [Jest](https://jestjs.io/) sem athugar hvort forritið virki eins og er skilgreint er að ofan.

Allar skrár með kóða skulu hafa test og line coverage skal vera a.m.k. 80% í heildina. Þetta á við node.js kóða, ekki þarf að telja með þann kóða sem keyrður er úr CLI/gegnum `build` scriptu. Ekki er krafa um að skrifa test fyrir kóða á framenda.

Þar sem coverage gögn eru skrifuð í `coverage/` möppu skal hunsa þær með `.gitignore` skrá.

Test skulu keyra með:

```bash
> npm test
# eða ef yarn er notað
> yarn test
# og ef beðið er um coverage
> npm test -- --coverage
# eða ef yarn er notað
> yarn test --coverage
```

Setja skal upp keyrslu á testum með [GitHub Actions](https://docs.github.com/en/actions) þannig að þau keyra sjálfkrafa þegar commitað er á GitHub á `main` branch, eða í pull requestum.

### Útlit og virkni á vef

Útbúa skal forsíðu sem birtir deildir skilgreindar í JSON skjalinu (titill og lýsing) með hlekk yfir á nánari upplýsingar um áfanga í hverri deild.

Á áfangasíðu skal birta titil og lýsingu deildar ásamt töflu með áföngum í deildinni. Töflan skal innihalda eftirfarandi dálka, sem passa við gögnin í CSV skrám (í sömu röð og er skilgreint sem fyrsta lína í hverri CSV skrá):

- Númer áfanga
- Heiti, með hlekk yfir á nánari upplýsingar um áfanga í Kennsluskrá HÍ (sem er seinasti dálkur í CSV skránni)
- ETSC einingar
- Kennslumisseri
- Námsstig

Setja skal upp a.m.k. _einfalt_ útlit á vefnum með flexbox eða grid. Takmarka heildarstærð og vera _responsive_.

Forritið skal útbúa merkingarfræðilegt og aðgengilegt HTML með _sniðmátum_.

### Bónusvirkni

Valkvæmt er að bæta við JavaScript virkni á framenda fyrir auka 10% mat á verkefni:

Inni á áfangasíðu skal vera hægt að raða töflunni eftir dálkum með því að smella á dálkinn. Þegar smella er á dálk skal raða töflunni eftir því dálki í hækkandi röð. Ef dálkurinn er þegar raðaður eftir þá skal raða í lækkandi röð. Athugið að hér þarf að útfæra JavaScript virkni í vafra, _client-side_.

### Tæki og tól

Nota skal node 18 eða nýrri útgáfu.

Nota skal NPM eða Yarn til að sækja og keyra tól.

Aðeins skal nota ECMAScript modules (ESM) og ekki CommonJS.

Setja skal upp að minnsta kosti `eslint` og `stylelint` fyrir JavaScript og CSS. Einnig er leyfilegt að setja upp `prettier`.

Breyta má út frá reglum sem eru settar upp í `eslint` og `stylelint` með því að breyta stillingar (`rc` skrám) en það er ekki leyfilegt að slökkva á reglum í kóða.

Bæði þarf að keyra `eslint` á Node og client JavaScript kóða.

Fyrir `stylelint` skal fylgja því sem uppsett var í [verkefni 6](https://github.com/vefforritun/vef1-2022-v6-synilausn) í vef1-2022.

Fyrir `eslint` og `prettier` skal fylgja því sem uppsett var í [verkefni 9](https://github.com/vefforritun/vef1-2022-v9-synilausn) í vef1-2022.

### GitHub & Netlify

Setja skal upp vefinn með niðurstöðum á Netlify tengt við GitHub.

## Mat

- 30% – Lestur gagna
- 20% – Test og lint
- 30% – Útlit og virkni á vef
- 10% – Tæki og tól
- 10% – GitHub & Netlify
- 10% *Bónus*, röðun á töflum client-side

Heildarstig eru því 110% sem gilda öll í lokaeinkunn (upp að hámarki 10).

## Sett fyrir

Verkefni sett fyrir í fyrirlestri mánudaginn 16. janúar 2023.

## Skil

Skila skal í Canvas í seinasta lagi fyrir lok dags fimmtudaginn 2. febrúar 2023.

Skil skulu innihalda:

- Slóð á verkefni keyrandi á Netlify
- Slóð á GitHub repo fyrir verkefni. Dæmatímakennurum skal hafa verið boðið í repo. Notendanöfn þeirra eru:
  - `MarzukIngi`
  - `ofurtumi`

---

> Útgáfa 0.2

| Útgáfa | Breyting      |
| ------ | ------------- |
| 0.1    | Fyrsta útgáfa |
| 0.2    | Breyta kröfum um test; breyta client-side JS virkni í „bónus“ |
