let vidas = 6;
let palabras = [
'hola', 'murcielago', 'escritorio', 'computadora', 'auriculares', 'escuela', 'proyecto', 
'tiburon', 'centro', 'hipopotamo', 'corazon', 'mouse'
];


let numero = Math.floor(Math.random() * palabras.length); //palabras.length significa cantidad de letras que tiene la palabra

let PalabraCorrecta = palabras[numero]; // elije la palabra

let progreso = []; //guiones

let fallidos = []; //letras que no estan en la palabra, lleva un registro

for (let i = 0; i < PalabraCorrecta.length; i++) // va letra por letra y pone un guion
  progreso.push('_');

updateScreen();


function updateScreen() {
  let h2 = document.querySelector('#word');
  let pre = document.querySelector('pre');
  let h3 = document.querySelector('h3');
  let img = document.querySelector('img');
  img.src = `img/${vidas}.png`
  pre.textContent = JSON.stringify(fallidos);
  h2.textContent = '';
  h3.textContent = `Vidas: ${vidas}`;
  for (let letter of progreso)
    h2.textContent += `${letter} `;
}


function handleSubmit(e) {
  e.preventDefault(); // no recarga la pantalla
  // la letra que elegiste
  let letter = e.target.letter.value; // ??
  
  if (letter.length > 1) { // si pusiste una palabra y no una letra
    if (letter == PalabraCorrecta) { 
      youWin();
      for (let i = 0; i < PalabraCorrecta.length; i++)
        progreso[i] = PalabraCorrecta[i];
      updateScreen();
      return;
    }
    else letter = letter[0];
  }
  
  if (fallidos.includes(letter)) return; // revisa si la letra esta incluida en falllidos
  let miss = true;
 
  for (let i = 0; i < PalabraCorrecta.length; i++) { //recorre letra por letra a ver si coincide
    if (letter == PalabraCorrecta[i]) { // si coincide
      progreso[i] = letter;
      miss = false;
    }
  }
  if (miss == true) {
    vidas--;
    fallidos.push(letter); // agrega la letra a fallidos
  }
  // actualizamos pantalla para mostrar progreso
  updateScreen();
  if (vidas == 0) gameOver();
  if (!progreso.includes('_')) youWin(); // si no hay mas guiones ganaste
  e.target.reset();
}

function youWin() {
  //document.querySelector('form > input').disabled = true;
  let h1 = document.querySelector('h1');
  h1.textContent = 'Bien ahi, Ganaste';  //textcontent = cambia el titulo
}

function gameOver() {
 //document.querySelector('form > input').disabled = true;
  let h1 = document.querySelector('h1');
  h1.textContent = 'Perdiste bobo';
}