document.querySelector('#btn-new').addEventListener('click', getPoke);
document.querySelector('#btn-idk').addEventListener('click', idk);
document.querySelector('#btn-checkAnswer').addEventListener('click', checkAnswer);
document.querySelector('input').addEventListener('click', clearInput);
disableBtns();
resetColors();
resetVisibility();

/* const gens = {
  1: {start: 1, end: 151},
  2: {start: 152, end: 251},
  3: {start: 252, end: 386},
  4: {start: 387, end: 493},
  5: {start: 494, end: 649},
  6: {start: 650, end: 721},
  7: {start: 722, end: 809},
  8: {start: 810, end: 898}
} */

const genDict = {
  "generation-i": 1,
  "generation-ii": 2,
  "generation-iii": 3,
  "generation-iv": 4,
  "generation-v": 5,
  "generation-vi": 6,
  "generation-vii": 7,
  "generation-viii": 8
}

const typeColors = {
  "normal": "aaaa99",
  "fire": "ff4322",
  "water": "3499fe",
  "electric": "ffcc33",
  "grass": "76cc55",
  "ice": "65cdff",
  "fighting": "bb5544",
  "poison": "aa5599",
  "ground": "ddbb55",
  "flying": "8493f7",
  "psychic": "ff5599",
  "bug": "aabb23",
  "rock": "bbaa66",
  "ghost": "6666bb",
  "dragon": "7466eb",
  "dark": "775544",
  "steel": "aaaabb",
  "fairy": "ee9aee",
}

// Get new pokemon from pokeapi
function getPoke(){
  resetVisibility();
  resetColors();
  enableBtns();
  document.querySelector('h2').innerText = "";
  document.querySelector('.types').innerHTML = "";
  const randomID = Math.floor(Math.random()*898);

  fetch(`https://pokeapi.co/api/v2/pokemon/${randomID}`)
      .then(res => res.json()) // parse response as JSON
      .then(data => {
        let name = data.species.name;
        document.querySelector('h2').innerText = name[0].toUpperCase() + name.slice(1); // Update answer
        document.querySelector('img').src = data.sprites.other['official-artwork'].front_default; // Update image

        data.types.forEach(obj => {
          const li = document.createElement('li');
          li.textContent = obj.type.name.toUpperCase();
          li.classList.add("data");
          li.style.backgroundColor = `#${typeColors[obj.type.name.toLowerCase()]}`;
          document.querySelector('.types').appendChild(li)
        })
      })
      .catch(err => {
          console.log(`error ${err}`)
      });
      
  fetch(`https://pokeapi.co/api/v2/pokemon-species/${randomID}`)
      .then(res => res.json()) // parse response as JSON
      .then(data => {
        let gen = genDict[data.generation.name];
        document.querySelector('.generation').innerText = `Gen ${gen}`;
      })
      .catch(err => {
          console.log(`error ${err}`)
      });
}

// Show answer, make bg red, and disable buttons
function idk() {
  document.querySelector('.play-area .answer-area').classList.add('incorrect');
  showAnswer();
  disableBtns();
}

// Show answer (text and image)
function showAnswer() {
  document.querySelector('#pokemon').classList.remove('silhouette');
  document.querySelector('.answer').classList.remove('hidden');
  document.querySelector('.user-answer').classList.add('hidden');
  document.querySelector('.pokemon-data').classList.remove('invisible');
}

// Check if answer is correct
function checkAnswer() {
  let user = document.querySelector('.user-answer').value;
  let answer = document.querySelector('.answer').innerText;
  if (user.toLowerCase() === answer.toLowerCase()) { // If answer correct
    resetColors();
    document.querySelector('.play-area .answer-area').classList.add('correct');
    showAnswer();
    disableBtns();
  } else { // If answer incorrect
    document.querySelector('.play-area .answer-area').classList.add('incorrect');
    document.querySelector('.user-answer').value = "Try again!";
  }
}

// Reset visibility of image and answer
function resetVisibility() {
  document.querySelector('.pokemon-data').classList.add('invisible');
  document.querySelector('#pokemon').classList.add('silhouette'); // Hide image
  document.querySelector('.answer').classList.add('hidden'); // Hide answer
  document.querySelector('.user-answer').classList.remove('hidden'); // Unhide user input
  document.querySelector('.user-answer').value = ""; // Reset input to blank
  document.querySelector('.user-answer').focus(); // Automatically select user input box
}

// Reset input field color
function resetColors() {
  document.querySelector('.play-area .answer-area').classList.remove('correct');
  document.querySelector('.play-area .answer-area').classList.remove('incorrect');
}

// Disable input and "submit"/"idk" buttons
function disableBtns() {
  document.querySelector('#btn-idk').disabled = true;
  document.querySelector('#btn-checkAnswer').disabled = true;
  document.querySelector('input').disabled = true;
  document.querySelector('#btn-idk').classList.add('disabled');
  document.querySelector('#btn-checkAnswer').classList.add('disabled');
}

//  Enable input and "submit"/"idk" buttons
function enableBtns() {
  document.querySelector('#btn-idk').disabled = false;
  document.querySelector('#btn-checkAnswer').disabled = false;
  document.querySelector('input').disabled = false;
  document.querySelector('#btn-idk').classList.remove('disabled');
  document.querySelector('#btn-checkAnswer').classList.remove('disabled');
}

// Clear input field when clicked
function clearInput() {
  if (document.querySelector('.user-answer').value = "Try again!") {
    document.querySelector('.user-answer').value = "";
  }
}