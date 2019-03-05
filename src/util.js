import moment from 'moment';

export const clearNode = (node) => {
  while (node.firstChild) {
    node.removeChild(node.firstChild);
  }
};

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
    .add(`${getRandomInteger(1, 24)}`, `hours`)
    .subtract(`${getRandomInteger(1, 24)}`, `hours`)
    .add(`${getRandomInteger(1, 60)}`, `minutes`)
    .subtract(`${getRandomInteger(1, 60)}`, `minutes`)
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
