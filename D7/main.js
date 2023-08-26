const API_URL = 'https://striveschool-api.herokuapp.com/api/';

async function getProducts() {
    try {
        const response = await fetch(`${API_URL}product/`, {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NGU0ODU1ZWRmZmI4YjAwMTQ0MTNiYjIiLCJpYXQiOjE2OTI2OTc5NTAsImV4cCI6MTY5MzkwNzU1MH0._u95--aMVARhkeChkALGwmugLUXO-Tg76cPBrIy9BWU'
            }
        });
        if (response.ok) {
            const data = await response.json();
            console.log('data: ', data);

            let productsShelf = document.querySelector('.products-shelf');
            productsShelf.innerHTML = data.map((product) => {
                return `<div class='col-xl-3 col-lg-4 col-md-6 mb-4'>
                            <div class='card bg-white rounded shadow-sm' id='id-${product._id}'>
                                <img src='${product.imageUrl}' alt="product-image" class="img-fluid card-img-top">
                                <div class='card-body border border-secondary'>
                                    <p class='font-weight-bold product-name'>${product.name}</p>
                                    <div class='d-flex justify-content-between'>
                                        <button class='btn btn-primary' id='add' onclick="addToCart('${product.name}', '${product.price}', '${product._id}')">€ ${product.price}</button>
                                        <button class='btn btn-success' id='detail'><a href='./prodotto.html?id=${product._id}'>Dettagli</a></button>
                                    </div>
                                </div>
                            </div>
                        </div>`
                }).join('')
        }
    } catch (error) {
        console.log('Errore nel recupero dei prodotti: ', error);
        alert('Si è verificato un errore durante la richiesta.');
    }
}

function addToCart(name, price, id) {
    // Selezioniamo la card del prodotto selezionato in base al suo codice
    const product = document.querySelector('#id-' + id + ' .card-body');

    // Selezioniamo il bottone per aggiungere al carrello
    const addButton = document.querySelector('#id-' + id + ' .card-body .btn');

    // Selezioniamo il contenitore per la lista dei prodotti aggiunti al carrello
    const cart = document.querySelector('.items');

    // Selezioniamo il display del carrello che visualizza il totale
    const total = document.querySelector('h1.display-5 span');

    // Applichiamo uno stile alla card del prodotto aggiunto al carrello
    product.className = 'card-body border border-danger';
    addButton.className = 'btn btn-danger';

    cart.innerHTML += `<li class='item'> ${name}, ${price}
                            <button class='btn btn-danger rounded-circle' onclick='removeItem(event, "${id}", "${price}")'> x </button>
                       </li>`;

    // Aggiorniamo il prezzo totale da visualizzare nel carrello
    total.innerText = (Number(total.innerText) + Number(price)).toFixed(2);
}

function removeItem(event, id, price) {
    // Rimuove il prodotto selezionato dal carrello
    event.target.closest('li').remove();

    // Aggiorna il totale visualizzato nel carrello
    const total = document.querySelector('h1.display-5 span');
    total.innerText = (Number(total.innerText) - Number(price)).toFixed(2);

    // Rimuove lo stile applicato alla card
    const product = document.querySelector('#id-' + id + ' .card-body');
    const addButton = document.querySelector('#id-' + id + ' .card-body .btn');
    product.className = 'card-body border border-secondary';
    addButton.className = 'btn btn-primary';
}

function emptyCart() {
    // Cancella tutti gli elementi inseriti nella lista del carrello
    document.querySelector('.items').innerHTML = '';

    // Resetta il totale visualizzato nel display del carrello
    const total = document.querySelector('h1.display-5 span');
    total.innerText = '0';

    // Resetta lo stile applicato alle card
    const products = document.querySelectorAll('.card-body');
    const addButtons = document.querySelectorAll('#add');
    products.forEach(product => product.className = 'card-body border border-secondary');
    addButtons.forEach(btn => btn.className = 'btn btn-primary');
}

function findProduct(event) {
    // Ricava la query dal testo inserito nella casella di ricerca
    let query = event.target.value;

    // Seleziona tutti i nomi dei prodotti ottenuti dalla richiesta al server
    let productNames = document.querySelectorAll('.product-name');

    // Per ogni nome controlla se la query inserita corrisponde ai nomi presenti
    // e visualizza le card dei prodotti corrispondenti
    productNames.forEach((name) => {
        const productCard = name.parentElement.parentElement;

        if (name.innerText.toLowerCase().includes(query.toLowerCase())) {
            productCard.style.display = 'block';
        } else {
            productCard.style.display = 'none';
        }
    })
}

window.onload = () => {
    getProducts();
}
