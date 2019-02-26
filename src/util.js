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
  return Date.now() + 1 + Math.floor(Math.random() * 7) * 24 * 60 * 60 * 1000;
};

export const getDateFromTimestamp = (timestamp) => {
  const months = [`January`, `February`, `March`, `April`, `May`, `June `, `July`, `August`, `September`, `October`, `November`, `December`];
  const date = new Date(timestamp * 1000);
  const day = date.getDate();
  const month = months[date.getMonth()];

  return `${day} ${month}`;
};

export const getTimeFromTimestamp = (timestamp) => {
  const date = new Date(timestamp * 1000);
  let hours = date.getHours();
  let minutes = date.getMinutes();
  const ampm = hours >= 12 ? `pm` : `am`;

  hours = hours % 12;
  hours = hours ? hours : 12;
  minutes = minutes < 10 ? `0${minutes}` : minutes;

  return `${hours}:${minutes} ${ampm.toUpperCase()}`;
};
