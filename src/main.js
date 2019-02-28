import {getRandomInteger, clearNode} from './util';
import getFilterItem from './get-filter-item';
import getTaskCard from './get-task-card';
import {filters, getTaskData} from './data';

const DEFAULT_TASKS_COUNT = 7;
const mainFilter = document.querySelector(`.main__filter`);
const boardTasks = document.querySelector(`.board__tasks`);

const renderFilter = (filter) => {
  mainFilter.insertAdjacentHTML(`beforeend`, getFilterItem(filter));
};

const renderAllFilters = (filtersArray) => {
  filtersArray.forEach((item) => renderFilter(item));
};

const getAllTasks = (tasksCount = DEFAULT_TASKS_COUNT) => {
  return new Array(tasksCount)
    .fill(``)
    .map(() => {
      const taskData = getTaskData();
      return getTaskCard(taskData);
    })
    .join(``);
};

const renderAllTaskCards = (tasksCount = DEFAULT_TASKS_COUNT) => {
  boardTasks.insertAdjacentHTML(`beforeend`, getAllTasks(tasksCount));
};

mainFilter.addEventListener(`click`, (evt) => {
  const tasksCount = getRandomInteger(1, 10);
  if (evt.target.tagName === `INPUT`) {
    clearNode(boardTasks);
    renderAllTaskCards(tasksCount);
  }
});

renderAllFilters(filters);
renderAllTaskCards();

