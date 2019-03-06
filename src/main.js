import {getRandomInteger, clearNode} from './util';
import getFilterItem from './get-filter-item';
import {filters, getTaskData} from './data';
import Task from './task';
import TaskEdit from './task-edit';

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
  const fragment = document.createDocumentFragment();
  new Array(tasksCount)
    .fill(``)
    .forEach(() => {
      const taskData = getTaskData();
      const task = new Task(taskData);
      const taskEdit = new TaskEdit(taskData);

      const renderEditTaskComponent = () => {
        taskEdit.render();
        boardTasks.replaceChild(taskEdit.element, task.element);
        task.unrender();
      };
      const renderTaskComponent = () => {
        task.render();
        boardTasks.replaceChild(task.element, taskEdit.element);
        taskEdit.unrender();
      };

      task.onEdit = renderEditTaskComponent;
      taskEdit.onSubmit = renderTaskComponent;
      taskEdit.onCancel = renderTaskComponent;

      task.render();
      fragment.appendChild(task.element);
    });

  return fragment;
};

const renderAllTaskCards = (tasksCount = DEFAULT_TASKS_COUNT) => {
  boardTasks.appendChild(getAllTasks(tasksCount));
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

