"use strict";

// CSS
import "../style/style.css";

// JavaScript Component
import darkMode from "./utils/dark-mode";
darkMode();

// Title
const title = document.querySelector(".title__container");
const win = document.querySelector(".title__Win");
// Result Text
const result = document.querySelector(".result");
const resultText = document.querySelector("#result__text");
// Left side images
const imageLeft = document.querySelector(".hand__Left");
const imageLeftSrc = document.querySelector(".hand__Left_Temp");
// Right side images
const imageRight = document.querySelector(".hand__Right");
const imageRightSrc = document.querySelector(".hand__Right_Temp");
// Selection
const options = document.querySelectorAll(".option");
const Selection = document.querySelector(".selection");
// Score display
const user = document.querySelector(".User");
const userScore = document.querySelector(".User__score");
const computer = document.querySelector(".Computer");
const computerScore = document.querySelector(".Computer__score");
// Reset
const reset = document.querySelector(".repeat");
const resetToggle = document.querySelector(".repeatbtn");

let user_Score, computer_Score, playing;

// Initialization
const init = function () {
  user_Score = 0;
  computer_Score = 0;
  playing = false;

  userScore.textContent = 0;
  computerScore.textContent = 0;

  user.classList.add("hidden");
  computer.classList.add("hidden");
  reset.classList.add("hidden");
  imageLeft.classList.add("hidden");
  imageRight.classList.add("hidden");
  Selection.classList.remove("hidden");
  resultText.classList.remove("hidden");
  title.classList.remove("hidden");
  win.classList.add("hidden");

  resultText.textContent = `Let's Play`;
};
init();

// Let's Play
result.addEventListener("click", function () {
  playing = true;
  user.classList.remove("hidden");
  computer.classList.remove("hidden");
  reset.classList.remove("hidden");
  imageLeft.classList.remove("hidden");
  imageRight.classList.remove("hidden");
});

// Reset function
resetToggle.addEventListener("click", init);

const buttonMap = {
  "🪨": "Illustrations/left_1.png",
  "📃": "Illustrations/left_2.png",
  "✂️": "Illustrations/left_3.png",
};

// Setter function
function rockPaperScissor(e) {
  const emoji = e.target.textContent;
  if (playing) {
    let random = Math.trunc(Math.random() * 3) + 1;

    buttonMap.hasOwnProperty(emoji)
      ? (imageLeftSrc.src = buttonMap[emoji])
      : console.log("Error");
    imageRightSrc.src = `Illustrations/right_${random}.png`;

    compareSelections(emoji, random);
  }
}
// Comparison Function
function compareSelections(userSelection, computerSelection) {
  let result = 0; // 0 for a tie, 1 for user win, -1 for computer win

  if (
    (userSelection === "🪨" && computerSelection === 3) ||
    (userSelection === "📃" && computerSelection === 1) ||
    (userSelection === "✂️" && computerSelection === 2)
  ) {
    // User wins
    result = 1;
  } else if (
    (userSelection === "🪨" && computerSelection === 2) ||
    (userSelection === "📃" && computerSelection === 3) ||
    (userSelection === "✂️" && computerSelection === 1)
  ) {
    // Computer wins
    result = -1;
  }

  if (result === 1) {
    ++user_Score;
    userScore.textContent = user_Score;
    resultText.textContent = "You win! 🏆";
  } else if (result === -1) {
    ++computer_Score;
    computerScore.textContent = computer_Score;
    resultText.textContent = "Computer wins! 🏆";
  } else {
    // It's a tie
    resultText.textContent = "It's a tie! ⛔";
  }

  if (user_Score >= 10 || computer_Score >= 10) {
    playing = false;
    Selection.classList.add("hidden");
    resultText.classList.add("hidden");
    title.classList.add("hidden");
    win.classList.remove("hidden");
    user_Score < 10
      ? (win.innerHTML = "You<br />Lose")
      : (win.innerHTML = "You<br />Win");
  }
}

// Selection calling
options.forEach(function (option) {
  option.addEventListener("click", rockPaperScissor);
});
