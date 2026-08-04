const deckViewSection = document.querySelector("#deck-view");
const flashcardTemplate = document.querySelector("#card-template");

const deckViewTitle = deckViewSection.querySelector(".gallery__title");
const deckViewList = deckViewSection.querySelector(".gallery__list");

function createFlashcardEl(cardData) {
  const flashcardEl =
    flashcardTemplate.content.firstElementChild.cloneNode(true);

  const flashcardTitle = flashcardEl.querySelector(".card__title");
  const flipButton = flashcardEl.querySelector(".card__btn_type_flip");
  const deleteButton = flashcardEl.querySelector(".card__btn_type_delete");

  flashcardTitle.textContent = cardData.question;

  flipButton.addEventListener("click", () => {
    const isShowingQuestion = flashcardTitle.textContent === cardData.question;

    flashcardTitle.textContent = isShowingQuestion
      ? cardData.answer
      : cardData.question;

    flashcardEl.classList.toggle("card_flipped");
  });

  deleteButton.addEventListener("click", () => {
    flashcardEl.remove();
  });

  return flashcardEl;
}

function renderDeckView(deck) {
  deckViewTitle.textContent = deck.name;

  deckViewList.querySelectorAll(".card").forEach((cardEl) => cardEl.remove());

  deck.cards.forEach((cardData) => {
    const flashcardEl = createFlashcardEl(cardData);
    deckViewList.prepend(flashcardEl);
  });
}

export { renderDeckView };
