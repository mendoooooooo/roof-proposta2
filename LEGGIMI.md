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
