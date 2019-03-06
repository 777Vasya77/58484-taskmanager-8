import {getRandomArrayItems, getRandomBoolean, getRandomTags, getRandomTimestamp} from './util';

export const filters = [
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
