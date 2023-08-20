const selection = document.getElementById('selection');
const searchInput = document.getElementById('searchInput');
const tableBody = document.querySelector('tbody');

function makeTable(filteredArray) {
    tableBody.innerHTML = '';

    filteredArray.forEach((item) => {
        let tableRow = document.createElement('tr');
        tableRow.innerHTML = `<td>${item.name}</td>
                              <td>${item.username}</td>
                              <td>${item.address.city}</td>
                              <td>${item.address.street}</td>
                              <td>${item.address.zipcode}</td>
                              <td>${item.email}</td>
                              <td>${item.phone}</td>
                              <td>${item.website}</td>`;
        tableBody.appendChild(tableRow);
    });
}

function clearTable() {
    tableBody.innerHTML = '';
}

async function getUsersData() {
    let raw;
    try {
        raw = await fetch('https://jsonplaceholder.typicode.com/users');
        console.log('raw: ', raw);
    } catch(err) {
        console.log('fetch error: ', err);
    }
    
    try {
        if(raw.ok) {
            const resource = await raw.json();
            console.log('resourceObj: ', resource);

            let selectionValue = selection.value;
            let inputValue = searchInput.value;
            console.log(selectionValue, inputValue);

            let results = resource.filter((obj) => 
                obj[selectionValue].toLowerCase().includes(inputValue.toLowerCase())
            );

            console.log('risultati: ', results);
            makeTable(results); 
        } else {
            console.log('Errore: ', raw.status, raw.statusText);
            throw new Error(raw.statusText);
        }
    } catch(err) {
        console.log('Parse Error: ', err);
    }    
}

searchInput.addEventListener('input', () => {
    if(searchInput.value.length >= 3) getUsersData();
    else clearTable();
});