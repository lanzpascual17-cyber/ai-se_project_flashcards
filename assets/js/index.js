import { decks, getDeckByID } from "./decks.js";
import { hexToString, removeColorClasses } from "./colors.js";
import { renderCarouselView } from "./carousel.js";

const deckTemplate = document.querySelector("#deck-template");
const deckList = document.querySelector(".decks__list");
const homeSection = document.querySelector("#home");
const notFoundSection = document.querySelector("#not-found");
const carouselSection = document.querySelector("#carousel");

function createDeckEl(deckData) {
  const deckEl = deckTemplate.content.firstElementChild.cloneNode(true);
  const deckTitle = deckEl.querySelector(".deck__title");
  const deckLink = deckEl.querySelector(".deck__link");
  deckLink.href = `#carousel/${deckData.id}`;

  const colorName = hexToString(deckData.color);
  removeColorClasses(deckEl);
  deckEl.classList.add(`deck_color_${colorName}`);
  const deleteButton = deckEl.querySelector(".deck__delete-btn");
  const deckCount = deckEl.querySelector(".deck__count");
  deckCount.textContent = `${deckData.cards.length} cards`;

  deleteButton.addEventListener("click", () => {
    deckEl.remove();
  });

  deckTitle.textContent = deckData.name;
  return deckEl;
}

function renderDeckEl(deckData) {
  const deckEl = createDeckEl(deckData);

  deckList.prepend(deckEl);
}

decks.forEach(renderDeckEl);

function renderHomeView() {
  homeSection.hidden = false;
  carouselSection.hidden = true;
  notFoundSection.hidden = true;
}

function renderNotFoundView() {
  homeSection.hidden = true;
  carouselSection.hidden = true;
  notFoundSection.hidden = false;
}

function router() {
  const hash = window.location.hash;
  if (hash === "" || hash === "#home") {
    renderHomeView();
  } else if (hash.startsWith("#carousel/")) {
    const deckID = hash.split("/")[1];
    const deck = getDeckByID(deckID);

    if (deck) {
      homeSection.hidden = true;
      notFoundSection.hidden = true;
      renderCarouselView(deck);
    } else {
      renderNotFoundView();
    }
  } else {
    renderNotFoundView();
  }
}

document.addEventListener("DOMContentLoaded", () => {
  router();
});

window.addEventListener("hashchange", () => {
  router();
});
