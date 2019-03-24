import {getRandomArrayItems, getRandomBoolean, getRandomTags, getRandomTimestamp} from './util';

const DEFAULT_TASKS_COUNT = 7;

export const filterName = {
  ALL: `all`,
  OVERDUE: `overdue`,
  TODAY: `today`,
  FAVORITES: `favorites`,
  REPEATING: `repeating`,
  TAGS: `tags`,
  ARCHIVE: `archive`,
};

export const filters = [
  {
    name: filterName.ALL,
    checked: true,
    disabled: false
  },
  {
    name: filterName.OVERDUE,
    checked: false,
    disabled: true
  },
  {
    name: filterName.TODAY,
    checked: false,
    disabled: true
  },
  {
    name: filterName.FAVORITES,
    checked: false,
    disabled: false
  },
  {
    name: filterName.REPEATING,
    checked: false,
    disabled: false
  },
  {
    name: filterName.TAGS,
    checked: false,
    disabled: false
  },
  {
    name: filterName.ARCHIVE,
    checked: false,
    disabled: false
  }
];

const titles = [
  `Изучить теорию`,
  `Сделать домашку`,
  `Пройти интенсив на соточку`,
];

const colors = [
  `black`,
  `yellow`,
  `blue`,
  `green`,
  `pink`,
];

const tags = new Set([
  `homework`,
  `theory`,
  `practice`,
  `intensive`,
  `keks`,
  `work`,
  `walk`,
]);

export const getTaskData = () => (
  {
    title: getRandomArrayItems(titles, 1),
    dueDate: getRandomTimestamp(),
    tags: getRandomTags(tags),
    picture: `//picsum.photos/100/100?r=${Math.random()}`,
    color: getRandomArrayItems(colors, 1),
    repeatingDays: {
      'mo': getRandomBoolean(),
      'tu': false,
      'we': false,
      'th': false,
      'fr': false,
      'sa': false,
      'su': false,
    },
    isFavorite: getRandomBoolean(),
    isDone: getRandomBoolean(),
  }
);

export const tasksData = new Array(DEFAULT_TASKS_COUNT).fill(``).map(() => getTaskData());
