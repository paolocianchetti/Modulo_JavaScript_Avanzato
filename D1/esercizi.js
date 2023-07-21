// 1. Crea una funzione che controlli due numeri interi.
// Ritorna `true` se uno dei due è 50 o se la somma dei due è 50.

function sumInteger(n1, n2) {
  return (n1 === 50 || n2 === 50 || n1 + n2 === 50);
}

console.log(sumInteger(20, 30));

// 2. Crea una funzione che rimuova il carattere ad una specifica posizione da una stringa.
// Passa la stringa e la posizione come parametri e ritorna la stringa modificata.

function removeChar(stringInput, pos) {
  let charArray = stringInput.split('');
  charArray.splice(pos, 1);
  let stringOutput = charArray.join('');
  return stringOutput;
}

let Name = "Paul";
console.log(removeChar(Name, 2));

// 3. Crea una funzione che controlli se due numeri siano compresi tra 40 e 60 o tra 70 e 100.
// Ritorna `true` se rispecchiano queste condizioni, altrimenti ritorna `false`.

function checkIntervals(num1, num2) {
  return ((num1 >= 40 && num1 <= 60 && num2 >= 40 && num2 <= 60) || 
  (num1 >= 70 && num1 <= 100 && num2 >= 70 && num2 <= 100)) ? true : false;
}

console.log(checkIntervals(45, 55));

// 4. Crea una funzione che accetti un nome di città come parametro e ritorni
// il nome stesso se inizia con “Los” o “New”, altrimenti ritorni `false`.

function checkCity(city) {
  return (city.startsWith('Los') || city.startsWith('New')) ? true : false;
}

console.log(checkCity('Los Angeles'));

// 5. Crea una funzione che calcoli e ritorni la somma di tutti gli elementi di un array.
// L’array deve essere passato come parametro.

function sum(array) {
  let sum = 0;
  for(let x of array) {
    sum += x;
  }
  return sum;
}

let primes = [2, 3, 5, 7, 11];

console.log(sum(primes));

// 6. Crea una funzione che controlli che un array NON contenga i numeri 1 o 3.
// Se NON li contiene, ritorna `true`, altrimenti ritorna `false`.

function checkNumbers(array) {
  return !array.includes(1) && !array.includes(3);
}

console.log(checkNumbers(primes));

// 7. Crea una funzione per trovare il tipo di un angolo i cui gradi sono passati come parametro.
// Angolo acuto: meno di 90° ⇒ ritorna “acuto”
// Angolo ottuso: tra i 90° e i 180° gradi ⇒ ritorna “ottuso”
// Angolo retto: 90° ⇒ ritorna “retto”
// Angolo piatto: 180° ⇒ ritorna “piatto”

function angleType(deg) {
  if (deg < 90) return "acuto"
  if (deg > 90 && deg < 180) return "ottuso"
  if (deg === 90) return "retto"
  if (deg === 180) return "piatto"
}

console.log(angleType(90));

// 8. Crea una funzione che crei un acronimo a partire da una frase.
// Es. “Fabbrica Italiana Automobili Torino” deve ritornare “FIAT”.

function createAcronim(text) {
  let words = text.toUpperCase().split(' ');
  let stringOutput = '';
  for(let word of words) {
    stringOutput += word.charAt(0);
  }
  return stringOutput;
}

let frase = "Lavoro, Inclusione, Sviluppo, Autonomia";
console.log(createAcronim(frase));

// Esercizi extra

// NOTA: tutti gli esercizi devono essere svolti usando le funzioni

// 1. Partendo da una stringa (passata come parametro), ritorna il carattere più usato
// nella stringa stessa.

// Una soluzione è quella di creare una mappa delle frequenze per ciascun carattere
// presente nella stringa fornita in input alla funzione.
// In seguito si calcola la massima frequenza presente nella mappa e si usa
// questo valore per risalire al carattere più usato nella stringa stessa.

function charMaxFreq(stringInput) {
  let text = stringInput.toLowerCase().split(' ').join('');
  let frequencies = [];   // array delle frequenze dei caratteri presenti nella stringa
  let freqObj = {};       // mappa delle frequenze per ciascun carattere

  // aggiorniamo la mappa dei caratteri con le rispettive frequenze
  for(let i = 0; i < text.length; i++) {
    if(freqObj[text[i]] == undefined)
    {
      freqObj[text[i]] = 1;
    } else {
      freqObj[text[i]] += 1;
    }
  }

  // riempiamo l'array delle frequenze
  for(let value in freqObj) {
    frequencies.push(freqObj[value]);
  }

  // calcoliamo la frequenza massima nell'array di frequenze, corrispondente
  // al carattere più usato nella stringa di input
  let maxFreq = Math.max(...frequencies);

  // dal valore della frequenza massima risaliamo al carattere più ricorrente
  return Object.keys(freqObj).find(key => freqObj[key] === maxFreq);
}

let str = "aaaa bb c ddddddddd eeeee fffff gggggg hhhhh iiiiiiiiiiiiiiiiiiiiiii op";
console.log(charMaxFreq(str));

// 2. Controlla che due stringhe passate come parametri siano gli anagrammi l’una dell’altra.
// Ignora punteggiatura e spazi e ricordate di rendere la stringa tutta in minuscolo.
// Se le due parole sono anagrammi, ritorna true , altrimenti ritorna `false`.

// Qualsiasi parola che riproduce esattamente le lettere in un altro ordine è un
// anagramma. In altre parole, str1 e str2 sono anagrammi se riordinando le lettere di
// str1, possiamo ottenere str2 utilizzando tutte le lettere originali di str1 esattamente
// una volta.

// Ad esempio, tutte queste coppie sono anagrammi:
// silent = listen
// incest = insect

// Una semplice soluzione sarebbe quella di ordinare le stringhe date, dopo averle
// trasformate in array di caratteri attraverso il metodo split('').
// Se le stringhe riottenute con il metodo join('') diventano uguali dopo l'ordinamento,
// allora sono anagrammi.

function checkAnagrams(string1, string2) {
  let str1 = string1.split('').sort().join('');
  let str2 = string2.split('').sort().join('');
  return str1 == str2;
}

let word1 = 'incest';
let word2 = 'insect';

console.log(checkAnagrams(word1, word2));

// Un'altra soluzione è creare due mappe e memorizzare in esse la frequenza di ciascun
// carattere della prima e della seconda stringa. Quindi possiamo verificare se entrambe
// le mappe sono uguali o meno. Se entrambe le mappe risultano uguali, allora entrambe
// le stringhe sono anagrammi.

function checkAnagrams2(string1, string2) {
  // se la lunghezza di string1 non è la stessa di string2,
  // non possono essere un anagramma
  if(string1.length != string2.length) return false;

  // crea un oggetto vuoto per la string1
  freqObjString1 = {};

  // mantiene il conteggio di ogni carattere di string1 sull'oggetto
  for(let i = 0; i < string1.length; i++) {
    if(freqObjString1[string1[i]] == undefined)
    {
      freqObjString1[string1[i]] = 1;
    } else {
      freqObjString1[string1[i]] += 1;
    }
  }

  // crea un secondo oggetto vuoto per la string2
  freqObjString2 = {};

  // mantiene il conteggio di ogni carattere di string2 sull'oggetto
  for(let i = 0; i < string2.length; i++) {
    if(freqObjString2[string2[i]] == undefined)
    {
      freqObjString2[string2[i]] = 1;
    } else {
      freqObjString2[string2[i]] += 1;
    }
  }

  // restituisce true se entrambi gli oggetti hanno lo stesso contenuto
  let array1 = Object.values(freqObjString1).sort();
  let array2 = Object.values(freqObjString2).sort();

  for(let i = 0; i < array1.length; i++) {
    if(array1[i] !== array2[i]) {
      return false;
    } else {
      return true;
    }
  }
}

let word3 = 'trilussa';
let word4 = 'salustri';

console.log(checkAnagrams2(word3, word4));

// 3. Partendo da una lista di possibili anagrammi e da una parola
// (entrambi passati come parametri), ritorna un nuovo array contenente tutti gli anagrammi
// corretti della parola data.
// Per esempio, partendo da “cartine” e [”carenti”, “incerta”, “espatrio”],
// il valore ritornato deve essere [”carenti”, “incerta”].

function findAnagrams (array, word) {
  const result = [];
  for (let anagram of array) {
    if (checkAnagrams2(word, anagram)) {
      result.push(anagram)
    }
  }
  return result;
}

let word5 = 'cartine';
let words = ['carenti', 'incerta', 'espatrio'];

console.log(findAnagrams(words, word5));

// 4. Partendo da una stringa passata come parametro, ritorna `true`
// se la stringa è palindroma o `false` se non lo è.

function palindrom(str) {
  let word = str.toLowerCase().split(' ').join('');
  let strTest = word.split('').reverse().join('');
  return strTest === word;
}

console.log(palindrom("Angolo Bar a Bologna"));

// 5. Partendo da un numero intero (dai parametri) ritorna un numero che contenga
// le stesse cifre, ma in ordine contrario. Es. 189 ⇒ 981

function reverseNumber(num) {
  return Number(String(num).split('').reverse().join(''));
}

let number = 144;
console.log(reverseNumber(number));

// 6. Scrivi una funzione che accetti un numero positivo X come parametro.
// La funzione dovrebbe stampare a console una “scala” creata con il carattere “#”
// e avente X scalini.

// Es.
// X = 2
// `'# '
// '##'`
// X = 3
// `'# '
// '## '`
// `'###'`

function ladder(number) {
  if (number > 0) {
    for(let i = 1; i <= number; i++) {
      console.log("#".repeat(i));
    }
  } else {
    console.log("input number must be positive!!");
    return false;
  }
}

let X = 15;
ladder(X);

// 7. Crea una funzione che, data una stringa come parametro, ritorni la stessa stringa,
// ma al contrario. Es. “Ciao” ****⇒ “oaiC”

function reverseWord(word) {
  let rWord = word.split('').reverse().join('');
  return rWord;
}

console.log(reverseWord('I Love JavaScript!'));

// 8. Crea una funzione che accetti un array e un numero Y come parametro.
// Dividi l’array in sotto-array aventi lunghezza Y.
// Es. array: [1, 2, 3, 4], y: 2 ⇒ [[ 1, 2], [3, 4]]
// array: [1, 2, 3, 4, 5], y: 4 ⇒ [[ 1, 2, 3, 4], [5]]

function subArray(array, y) {
  let result = [];  // Array risultato finale contenente altri array all'interno
  let count = 0;    // contatore per il numero di sub array che vengono generati

  // calcoliamo il numero di sub array che devono essere creati
  for (let n = 0; n < array.length; n++) {
    if (n % y === 0) count++;
  }

  let pos = 0;    // indice della posizione iniziale per il metodo slice

  // generiamo i sub array di lunghezza y e li inseriamo dentro l'array result
  for (let i = 0; i < count; i++) {
    let sub = array.slice(pos, pos + y);
    pos += y;

    result.push(sub);
  }

  return result;
}

console.log(subArray([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 5));