import { decks, getDeckByID } from "./decks.js";
import { hexToString, removeColorClasses } from "./colors.js";
import { renderCarouselView } from "./carousel.js";

const cardTemplate = document.querySelector("#deck-template");
const cardList = document.querySelector(".gallery__list");
const homeSection = document.querySelector("#home");
const notFoundSection = document.querySelector("#not-found");
const carouselSection = document.querySelector("#carousel");

function createCardEl(deckData) {
  const cardEl = cardTemplate.content.firstElementChild.cloneNode(true);
  const cardTitle = cardEl.querySelector(".card__title");
  const cardLink = cardEl.querySelector(".card__link");
  cardLink.href = `#carousel/${deckData.id}`;

  const colorName = hexToString(deckData.color);
  removeColorClasses(cardEl);
  cardEl.classList.add(`card_color_${colorName}`);
  const deleteButton = cardEl.querySelector(".card__delete-btn");
  const cardCount = cardEl.querySelector(".card__count");
  cardCount.textContent = `${deckData.cards.length} cards`;

  deleteButton.addEventListener("click", () => {
    cardEl.remove();
  });

  cardTitle.textContent = deckData.name;
  return cardEl;
}

function renderCardEl(deckData) {
  const cardEl = createCardEl(deckData);

  cardList.prepend(cardEl);
}

decks.forEach(renderCardEl);

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
