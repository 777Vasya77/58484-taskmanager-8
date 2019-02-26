const colors = [
  `black`,
  `yellow`,
  `blue`,
  `green`,
  `pink`,
];

export default (color) => {
  return colors.map((item) => {
    return `
      <input type="radio" 
        id="color-${item}-6" 
        class="card__color-input card__color-input--${item} visually-hidden" 
        name="color" 
        value="${item}"
        ${item === color ? `checked` : ``}>
      <label for="color-${item}-6" class="card__color card__color--${item}">${item}</label>
    `;
  }).join(``);
};
