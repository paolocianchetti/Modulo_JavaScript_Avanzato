const URL = 'https://striveschool-api.herokuapp.com/books';

function getBooks() {
    // Avvia la richiesta HTTP fornendo l'URL
    fetch(URL)
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
        .then((resource) => {     // Chiamata con il corpo della risposta analizzata o null
            if (resource) {
                let booksShelf = document.querySelector('.books-shelf');
                booksShelf.innerHTML = resource.map((book) => {
                    return `<div class='col-xl-3 col-lg-4 col-md-6 mb-4>
                                <div class='card bg-white rounded shadow-sm' id='isbn-${book.asin}'>
                                    <img src='${book.img}' alt="book-cover" class="img-fluid card-img-top">
                                    <div class='card-body border border-secondary mb-4'>
                                        <p class='font-weight-bold book-title'>${book.title}</p>
                                        <div class='d-flex justify-content-between'>
                                            <button class='btn btn-primary' onclick="aggiungiAlCarrello('${book.title}', '${book.price}', '${book.asin}')">€ ${book.price}</button>
                                            <button class='btn btn-dark' onclick="cancellaCard('${book.asin}')">Salta</button>
                                            <button class='btn btn-success'><a href='./dettagli.html?isbn=${book.asin}'>Dettagli</a></button>
                                        </div>
                                    </div>
                                </div>
                            </div>`
                }).join('')
            } else {
                // Se sopra abbiamo ricevuto un errore 404 e abbiamo restituito null, finiamo qui
                alert('Errore 404!');
            }
        })
        .catch(err => {
            if (err instanceof TypeError) {
                // Questo accade se lanciamo TypeError sopra
                console.log("Esiste qualche problema nel server o si e' disconnessi dalla rete!", err);
            } else {
            // Deve essere una sorta di errore imprevisto
            console.error(err);
            }
    });
}

function cercaLibro(event) {
    // Ricava la query dal testo inserito nella casella di ricerca
    let query = event.target.value;
    // Seleziona tutti i titoli dei libri ottenuti dalla richiesta al server
    let titoli = document.querySelectorAll('.book-title');

    // Per ogni titolo controlla se la query inserita corrisponde ai titoli presenti
    // e visualizza solo la card dei libri corrispondenti
    titoli.forEach((titolo) => {
        const libro = titolo.parentElement.parentElement;

        if (titolo.innerText.toLowerCase().includes(query.toLowerCase())) {
            libro.style.display = 'block';
        } else {
            libro.style.display = 'none';
        }
    })
}

function aggiungiAlCarrello(title, price, asin) {
    // Selezioniamo la card del libro selezionato in base al suo codice
    const libro = document.querySelector('#isbn-' + asin + ' .card-body');

    // Selezioniamo il bottone per aggiungere al carrello
    const bottone = document.querySelector('#isbn-' + asin + ' .card-body .btn');

    // Selezioniamo il contenitore per la lista dei libri aggiunti al carrello
    const carrello = document.querySelector('.items');

    // Selezioniamo il display del carrello che visualizza il totale
    const totale = document.querySelector('h1.display-5 span');

    // Applichiamo uno stile alla card del libro aggiunto al carrello
    libro.className = 'card-body border border-danger mb-4';
    bottone.className = 'btn btn-danger';

    carrello.innerHTML += `<li class='item'> ${title}, ${price}
                                <button class='btn btn-danger rounded-circle' onclick='rimuoviDalCarrello(event, "${asin}", "${price}")'> x </button>
                           </li>`;

    // Aggiorniamo il prezzo totale da visualizzare nel carrello
    totale.innerText = (Number(totale.innerText) + Number(price)).toFixed(2);
}

function rimuoviDalCarrello(event, asin, price) {
    // Rimuove il libro selezionato dal carrello
    event.target.closest('li').remove();

    // Aggiorna il totale visualizzato nel carrello
    const totale = document.querySelector('h1.display-5 span');
    totale.innerText = (Number(totale.innerText) - Number(price)).toFixed(2);

    // Rimuove lo stile applicato alla card
    const libro = document.querySelector('#isbn-' + asin + ' .card-body');
    const bottone = document.querySelector('#isbn-' + asin + ' .card-body .btn');
    libro.className = 'card-body border border-secondary mb-4';
    bottone.className = 'btn btn-primary';
}

function svuotaCarrello() {
    // Cancella tutti gli elementi inseriti nella lista del carrello
    document.querySelector('.items').innerHTML = '';

    // Resetta il totale visualizzato nel display del carrello
    const totale = document.querySelector('h1.display-5 span');
    totale.innerText = '0';

    // Resetta lo stile applicato alle card
    const libri = document.querySelectorAll('.card-body');
    const bottoni = document.querySelectorAll('.card-body .btn');
    libri.forEach(libro => libro.className = 'card-body border border-secondary mb-4');
    bottoni.forEach(bottone => bottone.className = 'btn btn-primary');
}

function cancellaCard(asin) {
    const card = document.querySelector(`#isbn-${asin}`);
    card.style.display = 'none';
}

window.onload = () => {
    getBooks();
}