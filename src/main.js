import {getRandomInteger, clearNode, removeFromArray} from './util';
import getFilterItem from './get-filter-item';
import {filters, tasksData} from './data';
import Task from './task';
import TaskEdit from './task-edit';

const mainFilter = document.querySelector(`.main__filter`);
const boardTasks = document.querySelector(`.board__tasks`);

const renderFilter = (filter) => {
  mainFilter.insertAdjacentHTML(`beforeend`, getFilterItem(filter));
};

const renderAllFilters = (filtersArray) => {
  filtersArray.forEach((item) => renderFilter(item));
};

const getTasks = (tasks) => {
  const fragment = document.createDocumentFragment();

  tasks.forEach((taskData) => {
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

    taskEdit.onSubmit = (newData) => {
      taskData.title = newData.title;
      taskData.tags = newData.tags;
      taskData.color = newData.color;
      taskData.repeatingDays = newData.repeatingDays;
      taskData.dueDate = newData.dueDate;

      task.update(taskData);
      task.render();
      boardTasks.replaceChild(task.element, taskEdit.element);
      taskEdit.unrender();
    };

    taskEdit.onCancel = renderTaskComponent;
    taskEdit.onDelete = () => {
      removeFromArray(tasksData, taskData);
      taskEdit.unrender();
    };

    task.render();
    fragment.appendChild(task.element);
  });

  return fragment;
};

const renderTaskCards = (tasks = tasksData) => {
  boardTasks.innerHTML = ``;
  boardTasks.appendChild(getTasks(tasks));
};

mainFilter.addEventListener(`click`, (evt) => {
  const tasksCount = getRandomInteger(1, 10);
  if (evt.target.tagName === `INPUT`) {
    clearNode(boardTasks);
    renderTaskCards(tasksCount);
  }
});

renderAllFilters(filters);
renderTaskCards();

