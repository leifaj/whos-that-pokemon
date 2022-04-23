document.querySelector('#btn-new').addEventListener('click', getFetch);
document.querySelector('#btn-idk').addEventListener('click', idk);
document.querySelector('#btn-checkAnswer').addEventListener('click', checkAnswer);
document.querySelector('input').addEventListener('click', clearInput);
disableBtns();
resetColors();
resetVisibility();

// Get new pokemon from pokeapi
function getFetch(){
  resetColors();
  enableBtns();
  const randomID = Math.floor(Math.random()*898);
  const url = `https://pokeapi.co/api/v2/pokemon/${randomID}`
  document.querySelector('h2').innerText = "";

  fetch(url)
      .then(res => res.json()) // parse response as JSON
      .then(data => {
        console.log(data.species.name)
        let name = data.species.name;

        document.querySelector('h2').innerText = name[0].toUpperCase() + name.slice(1);
        document.querySelector('img').src = data.sprites.other['official-artwork'].front_default;
        resetVisibility();
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
  console.log(user);
  console.log(answer);
}

// Reset visibility of image and answer
function resetVisibility() {
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