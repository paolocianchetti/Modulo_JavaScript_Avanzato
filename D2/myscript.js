/* Chiamate Ajax con Promise multiple */

const url1 = "https://striveschool-api.herokuapp.com/api/deezer/search?q=eminem";
const url2 = "https://striveschool-api.herokuapp.com/api/deezer/search?q=metallica";
const url3 = "https://striveschool-api.herokuapp.com/api/deezer/search?q=queen";

function addCard(tag, objResponse, index) {
    tag.innerHTML += `<div class='card mb-5'>
                        <img src='${objResponse.data[index].album.cover_xl}' class='card-img-top w-100' alt='album cover.jpg'/>
                        <div class='card-body'>
                            <p class='card-text text-dark text-center'>${objResponse.data[index].album.title}</p>
                        </div>
                        <div class='card-footer text-muted small'>
                            <a href='${objResponse.data[index].preview}'>${objResponse.data[index].title}</a>
                        </div>
                    </div>`;
}

function makeRequest(url) {
    return new Promise(function(resolve, reject) {
        // chiamata remota Ajax
        const xhr = new XMLHttpRequest();
        xhr.open("GET", url);

        xhr.onload = function() {
            if(xhr.status === 200) {
                resolve(xhr.response);
            } else {
                reject(new Error('Errore durante la richiesta'));
            }
        }
        xhr.onerror = function() {
            reject(new Error('Errore di rete'));
        }
        xhr.send();
    });
}

makeRequest(url1)
    .then(response => {
        const obj1 = JSON.parse(response);
        console.log('obj1: ', obj1);
        let container = document.querySelector('#eminem');
        let section = document.querySelector('#eminemSection');
        container.classList.remove('d-none');

        for(let i = 0; i < obj1.data.length; i++) {
            addCard(section, obj1, i);
        }

        return makeRequest(url2);
    })
    .then(response2 => {
        const obj2 = JSON.parse(response2);
        console.log('obj2: ', obj2);
        container = document.querySelector('#metallica');
        section = document.querySelector('#metallicaSection');
        container.classList.remove('d-none');

        for(let i = 0; i < obj2.data.length; i++) {
            addCard(section, obj2, i);
        }

        return makeRequest(url3);
    })
    .then(response3 => {
        const obj3 = JSON.parse(response3);
        console.log('obj3: ', obj3);
        container = document.querySelector('#queen');
        section = document.querySelector('#queenSection');
        container.classList.remove('d-none');

        for(let i = 0; i < obj3.data.length; i++) {
            addCard(section, obj3, i);
        }
    })
    .catch(error => console.log(error))