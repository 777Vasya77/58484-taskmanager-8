import {getRandomInteger, clearNode} from "./util";
import getFilterItem from './get-filter-item';
import getTaskCard from './get-task-card';

const mainFilter = document.querySelector(`.main__filter`);
const boardTasks = document.querySelector(`.board__tasks`);

const filters = [
  {
    name: `All`,
    checked: true,
    disabled: false
  },
  {
    name: `Overdue`,
    checked: false,
    disabled: true
  },
  {
    name: `Today`,
    checked: false,
    disabled: true
  },
  {
    name: `Favorites`,
    checked: false,
    disabled: false
  },
  {
    name: `Repeating`,
    checked: false,
    disabled: false
  },
  {
    name: `Tags`,
    checked: false,
    disabled: false
  },
  {
    name: `Archive`,
    checked: false,
    disabled: false
  }
];

const renderFilter = (filter) => {
  mainFilter.insertAdjacentHTML(`beforeend`, getFilterItem(filter));
};

const renderAllFilters = (filtersArray) => {
  filtersArray.forEach((item) => renderFilter(item));
};

const renderTaskCard = () => {
  boardTasks.insertAdjacentHTML(`beforeend`, getTaskCard());
};

const renderAllTaskCards = (cardCount = 7) => {
  while (cardCount > 0) {
    renderTaskCard();
    cardCount--;
  }
};

mainFilter.addEventListener(`click`, (e) => {
  const cardCount = getRandomInteger(1, 10);
  if (e.target.tagName === `INPUT`) {
    clearNode(boardTasks);
    renderAllTaskCards(cardCount);
  }
});

renderAllFilters(filters);
renderAllTaskCards();

