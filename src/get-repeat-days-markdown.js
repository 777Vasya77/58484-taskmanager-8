export default (days) => {
  return Object.entries(days).map(([key, value]) => {
    return `<input 
                class="visually-hidden card__repeat-day-input" 
                type="checkbox" 
                id="repeat-${key}-6" 
                name="repeat" 
                value="${key}" 
                ${value ? `checked` : ``}>
            <label class="card__repeat-day" for="repeat-${key}-6">${key}</label>`;
  }).join(``);
};
