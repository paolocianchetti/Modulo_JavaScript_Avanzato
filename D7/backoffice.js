const API_URL = 'https://striveschool-api.herokuapp.com/api/';

// Selezioniamo tutti i tag principali della pagina
const navbarElement = document.querySelector('.navbar');
const addBtnElement = document.querySelector('header .btn');
const tableBody = document.getElementById('products-table-body');
const productFormContainer = document.getElementById('product-form-container');
const productForm = document.getElementById('product-form');
const productIdElement = document.getElementById('product-id'); 
const nameElement = document.getElementById('name');
const descriptionElement = document.getElementById('description');
const brandElement = document.getElementById('brand');
const imageUrlElement = document.getElementById('imageUrl');
const priceElement = document.getElementById('price');
const errorElements = document.querySelectorAll('#product-form div span');

async function fetchProducts() {
    try {
        const response = await fetch(`${API_URL}product/`, {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NGU0ODU1ZWRmZmI4YjAwMTQ0MTNiYjIiLCJpYXQiOjE2OTI2OTc5NTAsImV4cCI6MTY5MzkwNzU1MH0._u95--aMVARhkeChkALGwmugLUXO-Tg76cPBrIy9BWU'
            }
        });
        if (response.ok) {
            const data = await response.json();

            // Aggiunge i prodotti alla tabella
            createTable(data);
        }
    } catch (error) {
        console.log('Errore nel recupero dei prodotti: ', error);
        alert('Errore in fase di richiesta dei prodotti');
    }
}

function createTable(products) {
    tableBody.innerHTML = '';

    products.forEach(product => {
        const row = `
            <tr>
                <td>${product.name}</td>
                <td>${product.description}</td>
                <td>${product.brand}</td>
                <td>${product.price}</td>
                <td>
                    <div class="d-flex justify-content-evenly">
                        <button class="btn btn-outline-primary btn-sm" onclick="modifyProduct('${product._id}')">Modifica</button>
                        <button class="btn btn-outline-danger btn-sm" onclick="cancelProduct('${product._id}')">Cancella</button>
                    </div>
                </td>
            </tr>
        `
        tableBody.innerHTML += row;
    });
}

function changeTitleForm(id) {
    const formTitle = document.getElementById('form-title');
    formTitle.innerHTML = id ? 'Modifica Prodotto' : 'Aggiungi Prodotto';
}

function resetFormData() {
    productIdElement.value = '';
    nameElement.value = '';
    descriptionElement.value = '';
    brandElement.value = '';
    imageUrlElement.value = '';
    priceElement.value = '';

    errorElements.forEach(element => {
        element.textContent = '';
    });
}

function showProductForm() {
    addBtnElement.className = 'btn btn-warning mb-3';
    changeTitleForm(productIdElement.value);

    productFormContainer.className = 'container d-block';
    productFormContainer.scrollIntoView({ 
        behavior: "smooth",
        block: "start",
        inline: "center"
    });

    window.onscroll = () => {
        if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
            navbarElement.classList.add('d-none');
        } else {
            navbarElement.classList.remove('d-none');
        }
        if (window.scrollY === 0) navbarElement.classList.remove('d-none');  
    }
    
    productFormContainer.style.animationPlayState = 'running';

    addBtnElement.onclick = () => {
        addBtnElement.className = 'btn btn-warning mb-3';
        if(productFormContainer.style.animationPlayState === 'paused') {
            
            productFormContainer.className = 'container d-block';

            // resetto i dati contenuti nel form del prodotto
            resetFormData();
            
            changeTitleForm(productIdElement.value);

            productFormContainer.scrollIntoView({ 
                behavior: "smooth",
                block: "start",
                inline: "center"
            });
            productFormContainer.style.animationPlayState = 'running';
        } else {
            addBtnElement.className = 'btn btn-success mb-3';
            productFormContainer.className = 'container d-none';
            productFormContainer.style.animationPlayState = 'paused';
        }  
    }
}

function validateProductForm() {
    const errorsObj = {};

    const nameValue = document.getElementById('name').value;
    const descriptionValue = document.getElementById('description').value;
    const brandValue = document.getElementById('brand').value;
    const imageUrlValue = document.getElementById('imageUrl').value;
    const priceValue = document.getElementById('price').value;

    if (!nameValue) errorsObj.name = 'Il campo nome è obbligatorio.';
    else errorsObj.name = '';

    if (!descriptionValue) errorsObj.description = 'Il campo descrizione è obbligatorio.';
    else errorsObj.description = '';

    if (!brandValue) errorsObj.brand = 'Il campo marca è obbligatorio.';
    else errorsObj.brand = '';

    if (!imageUrlValue) errorsObj.imageUrl = 'Il campo imageUrl è obbligatorio.';
    else errorsObj.imageUrl = '';

    if (!priceValue) errorsObj.price = 'Il campo prezzo è obbligatorio.';
    else if (priceValue <= 0) errorsObj.price = 'Il prezzo deve essere positivo e diverso da zero.'
    else errorsObj.price = '';

    const validation = {
        isValid: Object.values(errorsObj).every(value => value === ''),
        errorsObj
    }

    let validFlag = true;

    if (!validation.isValid) {
        for(const key in validation.errorsObj) {
            const errorElement = document.getElementById(`${key}-error`);
            errorElement.textContent = '';
            errorElement.textContent = validation.errorsObj[key];
        }
        validFlag = false;
    }

    return validFlag;
}

async function modifyProduct(id) {
    // esegue la fetch GET con id del prodotto
    let query = (`${API_URL}product/` + id);
    try {
        const response = await fetch(query, {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NGU0ODU1ZWRmZmI4YjAwMTQ0MTNiYjIiLCJpYXQiOjE2OTI2OTc5NTAsImV4cCI6MTY5MzkwNzU1MH0._u95--aMVARhkeChkALGwmugLUXO-Tg76cPBrIy9BWU'
            }
        });
        if (response.ok) {
            const product = await response.json();
            console.log('dati del prodotto: ', product);

            // scrive i dati del prodotto nel form compreso il suo id nel campo nascosto
            productIdElement.value = product._id;
            nameElement.value = product.name;
            descriptionElement.value = product.description;
            brandElement.value = product.brand;
            imageUrlElement.value = product.imageUrl;
            priceElement.value = product.price;

            // cancella eventuali segnalazioni di errore rimaste nel form
            errorElements.forEach(element => {
                element.textContent = '';
            });
        }
    } catch (error) {
        console.log('Errore nel recupero dei dati del prodotto selezionato', error);
        alert('Si è verificato un errore durante la richiesta.');
    }
    
    // richiama la funzione showProductForm()
    showProductForm();
}

async function cancelProduct(id) {
    let query = (`${API_URL}product/` + id);
    if (window.confirm('Sei sicuro di voler cancellare il prodotto selezionato?')) {
        try {
            const response = await fetch(query, {
                method: 'DELETE',
                headers: {
                    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NGU0ODU1ZWRmZmI4YjAwMTQ0MTNiYjIiLCJpYXQiOjE2OTI2OTc5NTAsImV4cCI6MTY5MzkwNzU1MH0._u95--aMVARhkeChkALGwmugLUXO-Tg76cPBrIy9BWU'
                }
            });
            console.log('deleteProduct response: ', response);
            fetchProducts();
        } catch (error) {
            console.log('Errore in fase di cancellazione del prodotto: ', error);
            alert('Si è verificato un errore durante la fase di cancellazione.');
        }
    }
}

// Quando si clicca sul pulsante Salva del form
productForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const isProductFormValid = validateProductForm();
    if (!isProductFormValid) return false;

    const productObj = {
        "name": nameElement.value,
        "description": descriptionElement.value,
        "brand": brandElement.value,
        "imageUrl": imageUrlElement.value,
        "price": priceElement.value
    }

    try {
        const query = productIdElement.value 
            ? `${API_URL}product/${productIdElement.value}`
            : `${API_URL}product/`;

        const HTTP_METHOD = productIdElement.value ? 'PUT' : 'POST';

        const response = await fetch(query, {
            method: HTTP_METHOD,
            body: JSON.stringify(productObj),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NGU0ODU1ZWRmZmI4YjAwMTQ0MTNiYjIiLCJpYXQiOjE2OTI2OTc5NTAsImV4cCI6MTY5MzkwNzU1MH0._u95--aMVARhkeChkALGwmugLUXO-Tg76cPBrIy9BWU'
            }
        });
        console.log('saveProduct response: ', response);

        if (HTTP_METHOD === 'PUT') {
            alert('Modifica avvenuta con successo!');
        } else if (HTTP_METHOD === 'POST') {
            alert('Inserimento nuovo prodotto avvenuto con successo!');
        }

        // Resetta tutti i campi del form
        resetFormData();

        // Scrolla all'inizio della pagina
        window.scrollTo(0, 0);

        // Ricarico la pagina dopo 2 secondi
        setTimeout(() => {
            window.location.reload();
          }, 2000);
    } catch (error) {
        console.log('Errore in fase di inserimento/modifica del prodotto: ', error);
        alert('Si è verificato un errore durante la fase di inserimento/modifica.');
    }
})

window.onload = () => {
    fetchProducts();
}