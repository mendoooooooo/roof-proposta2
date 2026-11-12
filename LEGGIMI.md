# ROOF — Cinema

Estrarre tutta la cartella e aprire index.html. Non occorre un server locale. Internet è necessario per foto e video remoti originali e per i font. Video silenziosi, senza controlli; alcuni browser possono limitare autoplay o download contemporanei.

## Sequenza
Loader → mosaico di nove video → espansione del video ROOF → We love what we do → Salmo → Scorpions → Solana → Be You → TheGiornalisti → scomposizione in cinque strisce del video → pannelli di studio, servizi e contatti in prospettiva.

Click su un progetto dalla home o dall’archivio: il media si riduce e si sposta nella colonna sinistra della scheda. Su mobile il progetto passa a una composizione verticale. Con preferenza di sistema “riduci movimento” i contenuti rimangono accessibili in sequenza statica.

## File della nuova versione
- index.html: struttura, header, menu, selettore IT/EN, footer, dialog galleria, caricamento degli script locali.
- content.js: archivio originale, invariato byte per byte. Contiene 13 record: quattro pagine e nove progetti, con testi, URL dei media e link.
- translations.js: dizionario originale di 167 traduzioni, invariato.
- language.js: traduzione dei nodi e metadati, persistenza della lingua; non ricostruisce i video.
- app.js: funzioni per tutte le pagine, filtri, gallerie, servizi, gestione video; nuova home, loader/mosaico, dissolvenze, scomposizione Canvas, percorso CSS 3D, transizione al dettaglio e cursore.
- style.css: regole base già esistenti per tipografia, navigazione, componenti, pagine e responsive.
- cinema.css: nuova direzione visiva; home cinematografica, pannelli, dettaglio diviso, portfolio sfalsato, vetro, mobile e movimento ridotto. Viene caricato dopo style.css.
- assets/roof-logo-yellow.png: logo giallo originale utilizzato dall’interfaccia.
- assets/roof-logo-black.png: variante nera conservata.
- vendor/gsap.min.js: GSAP locale per mosaico iniziale e transizione dei progetti; banner di licenza conservato.
- LEGGIMI.md: questa guida.

## File della versione precedente
- flight.css: stile di stanza, droni CSS, porta, loader e relative correzioni. Sostituito da cinema.css.
- scene3d.js: precedente scena Three.js e renderer dei droni. Non fa parte della nuova esperienza.
- flight.js: vecchia copia di lavoro delle funzioni home/loader, non caricata da index.html. Non distribuita.
- vendor/three.min.js: motore della precedente stanza WebGL. Non necessario per questa proposta.
- vendor/ScrollTrigger.min.js: disponibile nella vecchia cartella ma non caricato dall’HTML corrente. Non necessario: lo scroll usa requestAnimationFrame e coordinate della pagina.
- vendor/README.txt: note su GSAP e provenienza.
- qa.html: pagina temporanea di verifica mobile, esclusa dallo ZIP.

## Librerie e riferimento
GSAP: https://gsap.com/docs/v3/ — https://gsap.com/standard-license/
La proposta segue la sequenza descritta dal committente ispirata a https://herasymenkox.com/. La reference è rimasta al loader 0% nell’ambiente di verifica: non si dichiara una riproduzione esatta né l’uso delle stesse librerie del sito di riferimento. Il 3D di questa proposta è ottenuto con trasformazioni prospettiche CSS, non con modelli WebGL.

## Verifiche
Sintassi JavaScript; contenuti e traduzioni confrontati byte per byte; apertura mosaico; navigazione Salmo e approdo del media a sinistra; percorso studio in prospettiva; filtro XR mobile; larghezza pagina mobile 375 px senza overflow. Non è una verifica su ogni dispositivo fisico.

## Aggiornamento Cinema v2
Loader originale con logo e barra, uscita animata e mosaico conservato. Sovrapposizione delle sequenze per raccordare lavori e studio. Portfolio con tilt al puntatore e riflesso. Servizi con ingresso video e testo progressivo; transizione al dettaglio con media a destra. About: contrasto corretto sul giallo, manifesto a sinistra, marquee continuo con frecce e fondo uniforme dietro i loghi trasparenti. Contatti: descrizione inclusa nella card.

## Cinema v3 — cinque rifiniture
Mosaico con ingressi multidirezionali e zoom più lento, indipendente dal caricamento di tutti i video laterali. Al refresh delle pagine interne il centro mostra la pagina corrente; in home resta il video ROOF. Part of us centrato. Video Beyond the screen con object-fit cover. Spazio fra numero e titolo nei servizi. Apertura progetti con angoli arrotondati, rotazione prospettica, breve movimento sul lato opposto e approdo al dettaglio; riduzione iniziale solo dalla home.

## Cinema v4 — caricamenti, transizioni e mobile
Il loader mostra l'avanzamento reale e apre il sito solo quando i nove video del mosaico sono caricati (uscita di sicurezza dopo 30 s). Gli stessi elementi video vengono poi riusati dalla pagina: niente secondo download, niente ripartenza da capo. Il mosaico atterra esattamente sul video della pagina. Apertura progetto: il video reale viaggia fino alla copertina e continua a girare, il fondo si scurisce, i testi entrano solo dopo l'atterraggio. Refresh a metà pagina: animazione d'apertura, poi scorrimento automatico fino al punto precedente. Immagini ridimensionate in WebP tramite i0.wp.com (con ritorno all'originale) e mostrate solo a download completo. Tolti gli effetti più pesanti (blur sui video a schermo intero, vetro sfocato su mobile). YouTube: il riquadro apre il video in una nuova scheda. Mobile: video iniziale incorniciato e più piccolo, didascalie dei lavori più in basso con pulsante a destra, menu servizi a due colonne. Contatti: mappa sulla riga dell'indirizzo.

## Cinema v5
Refresh sulle pagine interne: i video visibili nella prima schermata (es. il video ROOF in About) compaiono già, in riproduzione, nel riquadro centrale del mosaico. Dalla home l'apertura di un lavoro torna all'animazione precedente (riduzione con angoli arrotondati, inclinazione, breve spostamento, poi espansione), mantenendo il video continuo e il fondo scuro. Nuovo visualizzatore foto: la foto cresce dalla miniatura in una cornice arrotondata su fondo sfocato e rientra nella miniatura alla chiusura; pulsante di chiusura circolare in vetro. Ritorno in home: il video principale riparte subito. What we do in home: hover con testo giallo, linea che si disegna e freccia che ruota verso destra.

## Cinema v6
Chiusura della foto ingrandita senza scatto: la pagina non cambia più larghezza mentre la foto è aperta (lo spazio della barra di scorrimento viene mantenuto), la cornice rientra senza inclinazione o zoom residui e si dissolve sulla miniatura. What we do in home: ogni servizio apre la pagina Servizi con quel servizio già selezionato e lo porta in vista (indirizzo #/services/0…6).

## Cinema v7 (mobile)
Meno scroll dal video ROOF a "We love what we do". Mosaico iniziale con tessere verticali 3:4 e anteprime ritagliate (mai deformate); il loader considera pronto un video solo quando sta davvero girando. Video ROOF a tutto schermo: la fascia del logo resta intera al centro, sopra e sotto un riflesso sfumato dello stesso video riempie lo schermo. Header della home che scompare scorrendo in giù e rientra fluido scorrendo in su. Foto ingrandite: fondo scuro esteso oltre le barre del telefono e più coprente. About: i video vengono precaricati subito dopo l'apertura. Al refresh il mosaico resta coperto fino all'atterraggio: la pagina dietro non si vede.

## Cinema v8
TheGiornalisti resta a schermo più a lungo prima della scomposizione (circa uno schermo intero di scroll). Mobile: studio, servizi e contatti diventano card nel normale flusso della pagina che entrano con una leggera salita (niente 3D guidato dallo scroll: niente scatti né schermate vuote); "Meet ROOF" sotto il video; nessun effetto hover in What we do sui dispositivi touch. Mosaico: le otto tessere laterali non si spostano più mentre il centro si allarga.

## Cinema v9
Mobile: "All projects" in basso nella home è un pulsante vero (circa 105×40 px), staccato da "Explore project"; la fascia in basso assorbe i tocchi imprecisi, così non si apre più per errore il lavoro sotto.
v9.1: "All projects" torna un link sottile (testo + linea), con un'area di tocco invisibile più ampia attorno.

## Cinema v10
Mobile: tornando in home il video ROOF riparte subito, senza dover scorrere. Loader più breve: i video del mosaico si scaricano pochi alla volta (prima quello centrale) invece che tutti e nove insieme, e il sito si apre al più tardi dopo 9 secondi su mobile (15 su desktop); i video non ancora pronti mostrano la loro anteprima e partono appena arrivano. Desktop: il mosaico ha un'altezza fissa, la riga in basso non viene più tagliata.

## Cinema v11
Loader: il sito non si apre mai senza il video ROOF (sulle pagine interne, senza il primo video della pagina). Il video ROOF inizia a scaricarsi dalla prima riga della pagina, prima di tutto il resto, e si scarica da solo con tutta la banda; solo quando può essere riprodotto fino in fondo partono gli altri video del mosaico, pochi alla volta. Gli altri video hanno poi qualche secondo in più (circa 2,5 su mobile, 4 su desktop): se non sono ancora pronti, il loro riquadro mostra l'anteprima e partono appena arrivano.
