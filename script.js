const body = document.querySelector("body");

let currentAnswer;
let wrongTry = 0;
let maxTry = 6;
let lettersCorrect = [];

function initGame() {
  body.classList.add("no-scroll");

  // Declaring generating variables
  const modalCreate = document.createElement("div");
  const resultCreate = document.createElement("div");
  const alienCreate = document.createElement("img");
  const greetCreate = document.createElement("h3");
  const textCreate = document.createElement("p");
  const buttonCreate = document.createElement("button");
  const wrapperCreate = document.createElement("main");
  const gallowsCreate = document.createElement("div");
  const quizWrapperCreate = document.createElement("div");
  const quizCreate = document.createElement("div");
  const answerHideCreate = document.createElement("ul");
  const hintCreate = document.createElement("h3");
  const guessCreate = document.createElement("h3");
  const virtualKeyboardCreate = document.createElement("div");

  // Adding classes to QUIZ section
  wrapperCreate.classList.add("wrapper");
  gallowsCreate.classList.add("gallows-part");
  gallowsCreate.innerHTML = `<img alt="Gallows"/>`;

  quizWrapperCreate.classList.add("quiz-wrapper");
  quizCreate.classList.add("quiz-part");
  answerHideCreate.classList.add("answer-hide");

  hintCreate.classList.add("hint-part");
  hintCreate.innerHTML = "Hint: <b></b>";

  guessCreate.classList.add("guess-part");
  guessCreate.innerHTML = "Incorrect guesses: <b></b>";

  virtualKeyboardCreate.classList.add("virtual-keyboard");

  // Adding classes to MODAL section
  modalCreate.classList.add("modal");
  resultCreate.classList.add("result");
  greetCreate.classList.add("hint-part");
  textCreate.innerHTML = "<p><b></b></p>";
  buttonCreate.classList.add("retry");
  buttonCreate.innerText = "Play again";

  // Generating the HTML-page
  body.appendChild(wrapperCreate);
  wrapperCreate.appendChild(gallowsCreate);
  wrapperCreate.appendChild(quizWrapperCreate);
  quizWrapperCreate.appendChild(quizCreate);
  quizCreate.appendChild(answerHideCreate);
  quizCreate.appendChild(hintCreate);
  quizCreate.appendChild(guessCreate);
  quizCreate.appendChild(virtualKeyboardCreate);

  // Generating MODAL
  body.appendChild(modalCreate);
  modalCreate.appendChild(resultCreate);
  resultCreate.appendChild(alienCreate);
  resultCreate.appendChild(greetCreate);
  resultCreate.appendChild(textCreate);
  resultCreate.appendChild(buttonCreate);
}
initGame();

const virtualKeyboard = document.querySelector(".virtual-keyboard");
const guess = document.querySelector(".guess-part b");
const answerHidden = document.querySelector(".answer-hide");
const alienHangman = document.querySelector(".gallows-part img");

const modal = document.querySelector(".modal");
const modalImg = modal.querySelector("img");
const modalGreet = modal.querySelector("h3");
const modalText = modal.querySelector("p");
const retryButton = document.querySelector(".retry");

function reset() {
  wrongTry = 0;
  lettersCorrect = [];
  modal.classList.remove("visible");
  answerHidden.querySelectorAll("li").forEach(function (elem) {
    elem.parentNode.removeChild(elem);
  });
  for (i = 0; i < currentAnswer.length; i++) {
    const hiddenLetter = document.createElement("li");
    answerHidden.appendChild(hiddenLetter);
    hiddenLetter.classList.add("letter");
  }
  alienHangman.src = `./images/gallows-${wrongTry}.png`;
  guess.innerText = `${wrongTry} / ${maxTry}`;
  virtualKeyboard
    .querySelectorAll("button")
    .forEach((button) => (button.disabled = false));
}

function randomiser() {
  const { answer, hint } = questions[~~(Math.random() * questions.length)];
  currentAnswer = answer;
  console.log(currentAnswer);
  document.querySelector(".hint-part b").innerText = hint;
  reset();
}
function gameOver(isWin) {
  setTimeout(() => {
    modal.classList.add("visible");
    modalImg.src = `./images/${isWin ? "victory" : "lost"}.png`;
    modalGreet.innerText = `${isWin ? "You WIN!" : "You lost!"}`;
    modalText.innerHTML = `${
      isWin ? "You guessed the word correctly: " : "The correct answer was: "
    } <b>${currentAnswer}</b>`;
  }, 250);
}
function buttonCheck(button, letterClicked) {
  if (currentAnswer.includes(letterClicked)) {
    let current = answerHidden.querySelectorAll("li");
    [...currentAnswer].forEach((letter, index) => {
      if (letter === letterClicked) {
        current[index].innerText = letter;
        current[index].classList.add("correct");
        lettersCorrect.push(letter);
      }
    });
  } else {
    wrongTry++;
    alienHangman.src = `./images/gallows-${wrongTry}.png`;
  }
  guess.innerText = `${wrongTry} / ${maxTry}`;
  button.disabled = true;
  if (wrongTry === maxTry) return gameOver(false);
  if (lettersCorrect.length === currentAnswer.length) return gameOver(true);
}
for (i = 97; i <= 122; i++) {
  const button = document.createElement("button");
  button.innerText = String.fromCharCode(i);
  virtualKeyboard.appendChild(button);
  button.addEventListener("click", (e) =>
    buttonCheck(e.target, button.innerText.toLowerCase())
  );
}
randomiser();
retryButton.addEventListener("click", randomiser);
