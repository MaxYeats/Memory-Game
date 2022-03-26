/** @format */

const cardArray = [
  {
    name: "EV1",
    img: "pics/EV1r.jpg",
  },
  {
    name: "EV2",
    img: "pics/EV2r.jpg",
  },
];

cardArray.sort(() => 0.5 - Math.random());
const gridDisplay = document.querySelector("#grid");
const resultDisplay = document.querySelector("#result");
const commentDisplay = document.querySelector("#comments");
let cardsChosen = [];
let cardsChosenIds = [];
let cardsWon = [];

function createBoard() {
  for (let i = 0; i < cardArray.length; i++) {
    const card = document.createElement("img");
    card.setAttribute("src", "pics/blank.jpg");
    card.setAttribute("data-id", i);
    card.addEventListener("click", flipCard);
    gridDisplay.appendChild(card);
  }
}

function checkMatch() {
  const cards = document.querySelectorAll("#grid img");
  const optionOneId = cardsChosenIds[0];
  const optionTwoId = cardsChosenIds[1];

  if (optionOneId == optionTwoId) {
    cards[optionOneId].setAttribute("src", "pics/blank.jpg");
    cards[optionTwoId].setAttribute("src", "pics/blank.jpg");
    commentDisplay.textContent = "Hey, you have clicked on the same image!";
  } else if (cardsChosen[0] == cardsChosen[1]) {
    commentDisplay.textContent = "Cool, you got a match!";

    cards[optionOneId].setAttribute("src", "pics/white.jpg");
    cards[optionTwoId].setAttribute("src", "pics/white.jpg");
    cards[optionOneId].removeEventListener("click", flipCard);
    cards[optionTwoId].removeEventListener("click", flipCard);

    cardsWon.push(cardsChosen);
  } else {
    cards[optionOneId].setAttribute("src", "pics/blank.jpg");
    cards[optionTwoId].setAttribute("src", "pics/blank.jpg");
    commentDisplay.textContent = "Sorry, try again!";
  }

  //then start the process all over again
  cardsChosen = [];
  cardsChosenIds = [];
  resultDisplay.textContent = cardsWon.length;

  if (cardsWon.length === cardArray.length / 2) {
    commentDisplay.textContent = "Congratulations! You found them all!";

    let element = document.getElementById("reveal-link");
    let button = document.getElementById("reveal-button");
    element.classList.add("visible");
    button.classList.add("visible");
  }
}

function flipCard() {
  let cardId = this.getAttribute("data-id");
  cardsChosen.push(cardArray[cardId].name);
  cardsChosenIds.push(cardId);

  this.setAttribute("src", cardArray[cardId].img);
  if (cardsChosen.length === 2) {
    setTimeout(checkMatch, 500);
  }
}

createBoard();
