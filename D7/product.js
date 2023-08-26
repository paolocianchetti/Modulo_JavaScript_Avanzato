const API_URL = 'https://striveschool-api.herokuapp.com/api/';

async function getProduct(id) {
    let query = (`${API_URL}product/` + id);
    try {
        const response = await fetch(query, {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NGU0ODU1ZWRmZmI4YjAwMTQ0MTNiYjIiLCJpYXQiOjE2OTI2OTc5NTAsImV4cCI6MTY5MzkwNzU1MH0._u95--aMVARhkeChkALGwmugLUXO-Tg76cPBrIy9BWU'
            }
        });
        if (response.ok) {
            const data = await response.json();
            console.log('dettagli prodotto: ', data);

            const details = document.querySelector('.product-details');
            details.innerHTML = `<div class='col-lg-12'>
                                    <div class='bg-white rounded shadow-sm'>
                                      <img src='${data.imageUrl}' alt='cover' class='img-fluid card-img-top'>
                                      <div class='p-4'>
                                        <h5>${data.name}</h5>
                                        <p class='small text-muted mb-0'>${data.description}</p>
                                        <div class='d-flex align-items-center justify-content-between rounded-pill bg-light px-3 py-2 mt-4'>
                                          <p class='small mb-0'><span class='font-weight-bold'>€ ${data.price}</span></p>
                                          <div class='badge text-bg-primary px-3 rounded-pill font-weight-normal'>${data.brand}</div>
                                        </div>
                                      </div>
                                    </div>
                                </div>`;
        }
    } catch (error) {
        console.log('Errore nel recupero dei dati del prodotto selezionato', error);
        alert('Si è verificato un errore durante la richiesta.');
    }
}

window.onload = () => {
    const params = new URLSearchParams(window.location.search);
    const id = params.get('id');
    getProduct(id);
}