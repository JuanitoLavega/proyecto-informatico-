let lives = 6;
let words = [
  'queryselector', 'document', 'form', 'onclick', 'handleclick',
  'parentelement', 'margintop', 'zoologico', 'muercielago',
  'internationalization', 'electroencefalograma',
  'justifycontent', 'apendice', 'pauta', 'confidencial',
  'reconocer', 'neuquen', 'oso'
];

// numero al azar entre 0 y cantidad de cosas en words
let rn = Math.floor(Math.random() * words.length);
// la palabra correcta
let correctWord = words[rn];
// lo que muestro con los guiones
let revealedWord = [];
// una lista de letras que no esta en correctWord
let notInWord = [];
// por cada letra en correctWord pongo un guion en revealedWord
for (let letter of correctWord)
  revealedWord.push('_');
// mostrar todos los guiones
updateScreen();

function updateScreen() {
  let h2 = document.querySelector('#word');
  let pre = document.querySelector('pre');
  let h3 = document.querySelector('h3');
  let img = document.querySelector('img');
  img.src = `img/${lives}.png`
  pre.textContent = JSON.stringify(notInWord);
  h2.textContent = '';
  h3.textContent = `Vidas: ${lives}`;
  for (let letter of revealedWord)
    h2.textContent += `${letter} `;
}


function handleSubmit(e) {
  e.preventDefault();
  // la letra que elegiste
  let letter = e.target.letter.value;
  // si el tipo ingresa una palabra y no una sola letra
  if (letter.length > 1) {
    if (letter == correctWord) { 
      youWin();
      for (let i = 0; i < correctWord.length; i++)
        revealedWord[i] = correctWord[i];
      updateScreen();
      return;
    }
    else letter = letter[0];
  }
  // no cuenta como jugada si ya elegiste esa letra
  if (notInWord.includes(letter)) return;
  let miss = true;
  // loopeamos todas las letras de correctWord
  for (let i = 0; i < correctWord.length; i++) {
    if (letter == correctWord[i]) { // si coincide
      revealedWord[i] = letter;
      miss = false;
    }
  }
  if (miss) {
    lives--;
    notInWord.push(letter);
  }
  // actualizamos pantalla para mostrar revealedWord
  updateScreen();
  if (lives == 0) gameOver();
  if (!revealedWord.includes('_')) youWin();
  e.target.reset();
}

function youWin() {
  document.querySelector('form > input').disabled = true;
  let h1 = document.querySelector('h1');
  h1.textContent = 'Ganaste! 😎';  
}

function gameOver() {
  document.querySelector('form > input').disabled = true;
  let h1 = document.querySelector('h1');
  h1.textContent = 'Game Over 💀';
}