import {removeFromArray} from './util';
import {filters, tasksData, filterName} from './data';
import moment from 'moment';
import flatpickr from 'flatpickr';
import Task from './task';
import TaskEdit from './task-edit';
import Filter from './filter';
import tagsChart from './tags-chart';
import colorsChart from './colors-chart';

const mainFilter = document.querySelector(`.main__filter`);
const boardTasks = document.querySelector(`.board__tasks`);
const controlStatistic = document.querySelector(`label[for=control__statistic]`);
const controlTask = document.querySelector(`label[for=control__task]`);
const boardContainer = document.querySelector(`.board.container`);
const statisticContainer = document.querySelector(`.statistic`);

controlStatistic.addEventListener(`click`, () => {
  boardContainer.classList.add(`visually-hidden`);
  statisticContainer.classList.remove(`visually-hidden`);

  flatpickr(`.statistic__period-input`, {mode: `range`, altInput: true, altFormat: `j M`, dateFormat: `j M`});

  tagsChart.render();
  colorsChart.render();
});

controlTask.addEventListener(`click`, () => {
  statisticContainer.classList.add(`visually-hidden`);
  boardContainer.classList.remove(`visually-hidden`);
});

const getFilters = (filtersData) => {
  const fragment = document.createDocumentFragment();

  filtersData.forEach((item) => {
    const filter = new Filter(item);
    filter.render();

    filter.onFilter = () => {
      switch (filter.name) {
        case filterName.TODAY:
          renderTaskCards(
              tasksData.filter((it) => it.dueDate === moment().unix())
          );
          return;

        case filterName.OVERDUE:
          renderTaskCards(
              tasksData.filter((it) => it.dueDate < moment().unix())
          );
          return;

        case filterName.REPEATING:
          renderTaskCards(
              tasksData.filter((it) => Object.values(it.repeatingDays).some((repeat) => repeat))
          );
          return;

        default:
          renderTaskCards();
          return;
      }
    };

    fragment.appendChild(filter.element);
  });

  return fragment;
};

const renderFilters = (filtersArray = filters) => {
  mainFilter.appendChild(getFilters(filtersArray));
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

renderFilters();
renderTaskCards();
