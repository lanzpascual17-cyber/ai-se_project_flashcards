import { hexToString, removeColorClasses } from "./colors.js";

const carouselSection = document.querySelector("#carousel");
const carouselTitle = carouselSection.querySelector(".carousel__title");
const leftBtn = carouselSection.querySelector(".carousel__btn_type_left");
const rightBtn = carouselSection.querySelector(".carousel__btn_type_right");
const cardEl = carouselSection.querySelector(".carousel__card");
const cardTextEl = carouselSection.querySelector(".carousel__card-text");
const flipBtn = carouselSection.querySelector(".carousel__btn_type_flip");

function renderCarouselView(deck) {
  carouselSection.hidden = false;

  let currentIndex = 0;
  let showingQuestion = true;

  removeColorClasses(cardEl);

  const colorName = hexToString(deck.color);

  cardEl.classList.add(`carousel__card_color_${colorName}`);

  function updateDisplay() {
    const currentCard = deck.cards[currentIndex];

    carouselTitle.textContent = `${deck.name} — ${currentIndex + 1} of ${deck.cards.length}`;

    if (showingQuestion) {
      cardTextEl.textContent = currentCard.question;
      cardEl.classList.remove("carousel__card_color_white");
    } else {
      cardTextEl.textContent = currentCard.answer;
      cardEl.classList.add("carousel__card_color_white");
    }
    leftBtn.disabled = currentIndex === 0;
    rightBtn.disabled = currentIndex === deck.cards.length - 1;
  }

  updateDisplay();
  flipBtn.addEventListener("click", () => {
    showingQuestion = !showingQuestion;
    updateDisplay();
  });
  rightBtn.addEventListener("click", () => {
    if (currentIndex < deck.cards.length - 1) {
      currentIndex++;
      showingQuestion = true;
      updateDisplay();
    }
  });
  leftBtn.addEventListener("click", () => {
    if (currentIndex > 0) {
      currentIndex--;
      showingQuestion = true;
      updateDisplay();
    }
  });
}

export { renderCarouselView };
