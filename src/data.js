import {getRandomBoolean, getRandomInteger, getRandomTimestamp} from './util';

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

export const getTaskData = () => (
  {
    title: [
      `Изучить теорию`,
      `Сделать домашку`,
      `Пройти интенсив на соточку`,
    ][getRandomInteger(0, 2)],
    dueDate: getRandomTimestamp(),
    tags: new Set([
      `homework`,
      `theory`,
      `practice`,
      `intensive`,
      `keks`,
      `work`,
      `walk`,
    ]),
    picture: `//picsum.photos/100/100?r=${Math.random()}`,
    color: [
      `black`,
      `yellow`,
      `blue`,
      `green`,
      `pink`,
    ][getRandomInteger(0, 4)],
    repeatingDays: {
      'mo': getRandomBoolean(),
      'tu': getRandomBoolean(),
      'we': getRandomBoolean(),
      'th': getRandomBoolean(),
      'fr': getRandomBoolean(),
      'sa': getRandomBoolean(),
      'su': getRandomBoolean(),
    },
    isFavorite: getRandomBoolean(),
    isDone: getRandomBoolean(),
  }
);
