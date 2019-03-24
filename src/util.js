import moment from 'moment';

export const getRandomInteger = (min, max) => {
  const rand = min - 0.5 + Math.random() * (max - min + 1);
  return Math.round(rand);
};

export const getRandomBoolean = () => {
  return [true, false][getRandomInteger(0, 1)];
};

export const getRandomTimestamp = () => {
  return moment()
    .add(`${getRandomInteger(1, 7)}`, `days`)
    .subtract(`${getRandomInteger(1, 7)}`, `days`)
    .format(`X`);
};

export const createElement = (template) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template;
  return newElement.firstChild;
};

export const getRandomTags = (tags) => {
  return [...tags]
    .sort(() => 0.5 - Math.random())
    .slice(0, getRandomInteger(0, 3));
};

export const getRandomArrayItems = (array, itemsCount) => {
  return array
    .sort(() => 0.5 - Math.random())
    .slice(0, itemsCount);
};

export const removeFromArray = (array, item) => {
  const index = array.findIndex((it) => it === item);
  array.splice(index, 1);
};
