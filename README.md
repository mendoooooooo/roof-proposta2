# ROOF — Cinema

Proposta indipendente di redesign per **ROOF Videodesign**, studio di Bologna specializzato in contenuti video, live visuals e ambienti 3D per eventi dal vivo.

La versione *Cinema* racconta lo studio come un film: un mosaico di video si apre sul logo ROOF, i lavori scorrono a tutto schermo e la pagina si scompone in pannelli prospettici. Il sito è statico: nessun server, nessuna build, nessuna installazione.

---

## Indice

1. [Avvio rapido](#avvio-rapido)
2. [Come funziona il sito](#come-funziona-il-sito)
3. [Le pagine](#le-pagine)
4. [Caricamento di video e immagini](#caricamento-di-video-e-immagini)
5. [Esperienza mobile](#esperienza-mobile)
6. [Lingua italiano / inglese](#lingua-italiano--inglese)
7. [Accessibilità](#accessibilità)
8. [Struttura dei file](#struttura-dei-file)
9. [Librerie e riferimenti](#librerie-e-riferimenti)
10. [Cronologia delle versioni](#cronologia-delle-versioni)
11. [Requisiti e note](#requisiti-e-note)

---

## Avvio rapido

1. Scarica o estrai l'intera cartella del progetto.
2. Apri `index.html` con un doppio clic (Chrome, Edge, Safari o Firefox recenti).

Non serve un server locale né alcuna installazione.

> **Importante:** mantieni la struttura delle cartelle così com'è. `index.html` deve restare accanto ai file `.css` e `.js` e alle cartelle `assets`, `vendor` e `media`.

---

## Come funziona il sito

### 1. Loader

All'apertura compaiono il logo ROOF e una barra che mostra l'avanzamento reale del caricamento.

- Il video ROOF inizia a scaricarsi dalla prima riga della pagina, prima di qualsiasi altra risorsa, e da solo con tutta la banda.
- Il sito **non si apre mai senza il video ROOF**. Sulle pagine interne vale lo stesso per il primo video della pagina.
- Gli altri otto video del mosaico partono subito dopo, pochi alla volta, e hanno qualche secondo in più per essere pronti. Se uno non è ancora pronto, il suo riquadro mostra l'anteprima e il video parte appena arriva.

### 2. Mosaico d'apertura

Nove video entrano da direzioni diverse e compongono un mosaico. Il riquadro centrale, con il video ROOF in home o l'anteprima della pagina corrente sulle pagine interne, si espande e atterra esattamente sul video della pagina, che continua senza ripartire.

### 3. La home come un film

Scorrendo la home la sequenza è:

**Video ROOF → "We love what we do" → Salmo → Scorpions → Solana → Be You → TheGiornalisti → scomposizione del video in cinque strisce → pannelli prospettici di studio, servizi e contatti**

Ogni lavoro occupa lo schermo con video, categoria, titolo, descrizione e pulsante **Explore project**. In basso un indicatore mostra il punto della sequenza e un link porta all'archivio completo.

### 4. Apertura di un progetto

Cliccando un lavoro, il video reale si stacca dalla pagina e vola fino alla copertina del progetto, continuando a girare senza ripartire. Durante il volo il fondo si scurisce e i testi della nuova pagina entrano solo dopo l'atterraggio.

### 5. Refresh a metà pagina

Se ricarichi la pagina mentre sei a metà, il sito ripete l'animazione d'apertura e poi scorre da solo fino al punto esatto in cui eri.

---

## Le pagine

| Pagina | Indirizzo | Contenuto |
|---|---|---|
| **Home** | `#/` | Mosaico, video ROOF, manifesto, sequenza dei 5 lavori selezionati, studio, servizi, contatti |
| **What we create** | `#/works` | Archivio dei 9 progetti in griglia sfalsata, con filtri per categoria e card che si inclinano seguendo il puntatore |
| **Services** | `#/services` | Elenco dei servizi con video e descrizione; `#/services/0…6` apre direttamente un servizio |
| **About** | `#/about` | Video dello studio, manifesto, marquee e loghi di clienti e collaboratori |
| **Let's talk** | `#/contacts` | Email, indirizzo con link alla mappa, descrizione e video |
| **Progetto** | `#/project/<nome>` | Copertina, note di progetto, crediti, galleria, video aggiuntivi, link a YouTube, progetto successivo |

### Foto ingrandite

Nella galleria di un progetto, una foto cliccata cresce dalla sua miniatura fino a una cornice arrotondata su fondo scuro e sfocato, con il nome del progetto e il numero dell'immagine. Si chiude con il pulsante circolare, cliccando sul fondo o con `Esc`, e rientra nella miniatura senza scatti.

### Video su YouTube

Il riquadro sotto i video di un progetto apre il video originale direttamente su YouTube, in una nuova scheda.

---

## Caricamento di video e immagini

**Video**
- Un unico gruppo di elementi video viene creato una sola volta e riutilizzato in tutto il sito, dal mosaico alla home alle pagine dei progetti: niente doppi download e niente ripartenze da capo.
- I video fuori schermo iniziano a scaricarsi poco prima di entrare in vista.
- Un video resta invisibile, lasciando vedere l'anteprima, finché non è davvero in riproduzione: nessun fotogramma nero o bloccato.
- Se il telefono blocca l'avvio automatico, i video visibili partono al primo tocco.

**Immagini**
- Le foto vengono servite ridimensionate e in WebP tramite il CDN di WordPress (`i0.wp.com`), con ritorno automatico all'originale se il CDN non risponde.
- Compaiono solo a download completo, mai "a pezzi".

---

## Esperienza mobile

### Video più leggeri

La cartella `media/m` contiene copie leggere dei **21 video** del sito:

| Tipo di video | Risoluzione |
|---|---|
| Video brevi in loop (mosaico, home, servizi, About) | 720p |
| Video lunghi dei progetti | 540p |

In tutto pesano **circa 57 MB invece di 266 MB**, circa 4,7 volte meno da scaricare.

Su telefoni e schermi fino a **900 px** il sito usa automaticamente queste copie, anche per il primissimo download del video ROOF. Su desktop restano i video originali in Full HD dal sito di ROOF.

### Layout dedicato

- **Video ROOF:** occupa lo schermo con la fascia del logo intera al centro; sopra e sotto un riflesso sfumato dello stesso video riempie lo spazio.
- **Mosaico:** usa tessere verticali, con anteprime ritagliate e mai deformate.
- **Lavori:** didascalie più in basso, con il pulsante sulla riga della descrizione.
- **Studio, servizi e contatti:** card nel normale flusso della pagina, senza il 3D guidato dallo scroll, per uno scorrimento fluido.
- **Header:** scompare scorrendo verso il basso e rientra scorrendo verso l'alto.
- **Hover:** nessun effetto hover sui dispositivi touch.

---

## Lingua italiano / inglese

Il selettore **IT / EN** è sempre disponibile nell'header.

- La scelta viene ricordata dal browser.
- La traduzione è locale e non ricostruisce i video, quindi cambiare lingua non interrompe la riproduzione.
- Nomi di brand, progetti, tour, crediti e termini tecnici restano in inglese.

---

## Accessibilità

- **Riduci movimento:** con l'opzione di sistema attiva, la home diventa una sequenza statica e i contenuti restano tutti accessibili.
- Link "Skip to content", focus visibile e navigazione da tastiera nei servizi (frecce, Home, Fine).
- Testi alternativi, ruoli e stati ARIA per menu, schede e pulsanti.
- Le foto ingrandite si chiudono con `Esc`.

---

## Struttura dei file

```
.
├── index.html        Struttura, header, menu, selettore IT/EN, footer, visualizzatore foto, avvio anticipato del video ROOF
├── style.css         Base: tipografia, navigazione, componenti, pagine, responsive
├── cinema.css        Direzione visiva Cinema: home cinematografica, pannelli, dettaglio progetto, mobile (caricato dopo style.css)
├── app.js            Pagine, navigazione, loader e mosaico, sequenza della home, gestione video, transizioni, foto ingrandite
├── content.js        Archivio dei contenuti originali: 4 pagine e 9 progetti con testi, media e link
├── language.js       Applicazione della lingua e memorizzazione della scelta
├── translations.js   Dizionario delle traduzioni italiane
├── assets/           Logo ROOF (giallo e nero)
├── vendor/           GSAP
└── media/
    └── m/            Versioni leggere dei video per mobile
```

---

## Librerie e riferimenti

| Libreria | Versione | Utilizzo |
|---|---|---|
| [GSAP](https://gsap.com/docs/v3/) | 3.15.0 | Mosaico d'apertura, transizioni dei progetti, foto ingrandite |

GSAP è incluso nella cartella `vendor`. Licenza: [GSAP Standard License](https://gsap.com/standard-license/).

Lo scroll usa `requestAnimationFrame` e le coordinate della pagina, senza librerie aggiuntive. Gli effetti tridimensionali sono ottenuti con trasformazioni prospettiche CSS, non con WebGL.

La sequenza segue l'idea indicata dal committente, ispirata a [herasymenkox.com](https://herasymenkox.com/). Non è una riproduzione di quel sito e non ne usa le librerie.

---

## Cronologia delle versioni

| Versione | Principali novità |
|---|---|
| **v2** | Loader con logo e barra, sequenze raccordate, portfolio con inclinazione al puntatore, nuovo About |
| **v3** | Mosaico con ingressi da più direzioni, apertura dei progetti con angoli arrotondati e rotazione prospettica |
| **v4** | Loader con avanzamento reale, video riutilizzati senza doppio download, refresh con ritorno al punto, immagini WebP, layout mobile rivisto |
| **v5** | Anteprima della pagina nel mosaico, nuovo visualizzatore foto, hover nei servizi della home |
| **v6** | Chiusura delle foto senza scatti, servizi della home collegati alla pagina Servizi |
| **v7** | Mobile: meno scroll iniziale, mosaico verticale, video ROOF con riflesso, header che scompare e rientra |
| **v8** | TheGiornalisti più a lungo, sezioni mobile senza 3D, mosaico stabile durante l'espansione |
| **v9** | Pulsante "All projects" facile da toccare su mobile |
| **v10** | Video ROOF che riparte al ritorno in home, loader più breve, mosaico intero su desktop |
| **v11** | Loader che attende sempre il video ROOF, scaricato per primo e da solo |
| **v12** | Video leggeri su mobile (`media/m`), originali in Full HD su desktop |

---

## Requisiti e note

- Serve una connessione internet per foto, font e, su desktop, video, che restano collegati al sito originale di ROOF.
- Su mobile i video vengono letti dalla cartella `media/m`: quando il sito verrà pubblicato online, questa cartella va caricata sul server insieme al resto.
- Alcuni browser possono limitare l'avvio automatico dei video o i download contemporanei.
- Tutti i contenuti sono di proprietà di RVD srl. Questo progetto è un concept di redesign indipendente.

© RVD srl — Independent redesign concept
