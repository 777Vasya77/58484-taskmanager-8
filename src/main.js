import {getRandomInteger, clearNode} from './util';
import getFilterItem from './get-filter-item';
import getTaskCard from './get-task-card';
import {filters, getTaskData} from './data';

const mainFilter = document.querySelector(`.main__filter`);
const boardTasks = document.querySelector(`.board__tasks`);

const renderFilter = (filter) => {
  mainFilter.insertAdjacentHTML(`beforeend`, getFilterItem(filter));
};

const renderAllFilters = (filtersArray) => {
  filtersArray.forEach((item) => renderFilter(item));
};

const renderTaskCard = () => {
  const task = getTaskData();
  boardTasks.insertAdjacentHTML(`beforeend`, getTaskCard(task));
};

const renderAllTaskCards = (cardCount = 7) => {
  while (cardCount > 0) {
    renderTaskCard();
    cardCount--;
  }
};

mainFilter.addEventListener(`click`, (evt) => {
  const cardCount = getRandomInteger(1, 10);
  if (evt.target.tagName === `INPUT`) {
    clearNode(boardTasks);
    renderAllTaskCards(cardCount);
  }
});

renderAllFilters(filters);
renderAllTaskCards();

