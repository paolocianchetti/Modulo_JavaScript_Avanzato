// Richiesta HTTP con fetch e API KEY Pexels

const API_KEY = 'NJOSB0ObtaYUuVhOCN7zHGrnyaRpnHYSDRG0fSejb3JfUNGbhCGSQ9Zs';

const inputSearch = document.querySelector('.form-control');
const btnSearch = document.querySelector('.btn');

let searchValue = '';

btnSearch.addEventListener('click', (event) => {
    // Acquisisce la query
    searchValue = inputSearch.value;
    event.preventDefault();

    let card;

    // Controlla lo stato di visualizzazione delle cards
    for(let i = 0; i < 12; i++) {
        card = document.querySelector(`#pexel-card-${i}`);
        if(!card.classList.contains('d-none')) {
            card.classList.add('d-none');
        }
    }

    // Avvia la richiesta HTTP fornendo la query inserita
    fetch(`https://api.pexels.com/v1/search?query=${searchValue}&per_page=12`, {
        method: 'GET',
        headers: {
            'Authorization' : API_KEY
        }
    })
    .then(response => {     // Richiama questo quando lo stato e le intestazioni sono pronte
        if (!response.ok) { // Se abbiamo ricevuto un errore 404 Not Found o simile
            return null;    // forse l'utente è disconnesso; restituisci un valore null
        }

        // Ora controlliamo le intestazioni per assicurarci che il server ci abbia inviato JSON.
        // In caso contrario, il nostro server è guasto e questo è un grave errore!
        let type = response.headers.get("content-type");
        if (type !== "application/json; charset=utf-8") {
            throw new TypeError(`Atteso JSON, invece abbiamo ${type}`);
        }

        // Se arriviamo qui, abbiamo uno stato 2xx e un tipo di contenuto JSON
        // così possiamo restituire con sicurezza una Promise per il corpo
        // della risposta come un oggetto JSON.
        return response.json();
    })
    .then(resource => {     // Chiamata con il corpo della risposta analizzata o null
        if (resource) {

            // Dichiaro le variabili per i Tag HTML di riferimento
            let pexelsCard;
            let pexelsCardImg;
            let pexelsCardLink;
            let pexelsCardPhotographer;

            resource.photos.map((img, index) => {
                pexelsCard = document.querySelector(`#pexel-card-${index}`);
                pexelsCardImg = document.querySelector(`#pexel-card-${index} img`);
                pexelsCardLink = document.querySelector(`#pexel-card-${index} h5 a`);
                pexelsCardPhotographer = document.querySelector(`#pexel-card-${index} .photographer a`);

                pexelsCard.classList.remove('d-none');
                pexelsCardImg.src = `${img.src.original}`;
                pexelsCardLink.textContent = `${img.alt}`;
                pexelsCardLink.href = `${img.url}`;
                pexelsCardPhotographer.textContent = `${img.photographer}`;
                pexelsCardPhotographer.href = `${img.photographer_url}`;
            })
            console.log('JSONObjResponse: ', resource);
        } else {
            // Se sopra abbiamo ricevuto un errore 404 e abbiamo restituito null, finiamo qui
            alert('Devi inserire un valore nel campo di ricerca. Errore 404!');
        }
    })
    .catch(err => {
        if (err instanceof TypeError) {
            // Questo accade se lanciamo TypeError sopra
            console.log("Esiste qualche problema nel server o si e' disconnessi dalla rete!", err);
        }
        else {
            // Deve essere una sorta di errore imprevisto
            console.error(err);
        }
    });
}, false)