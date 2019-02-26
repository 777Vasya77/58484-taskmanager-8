export default (days) => {
  const daysMarkdown = [];
  for (const [key, value] of Object.entries(days)) {
    const dayMarkdown = `
        <input 
            class="visually-hidden card__repeat-day-input" 
            type="checkbox" 
            id="repeat-${key}-6" 
            name="repeat" 
            value="${key}" 
            ${value ? `checked` : ``}>
        <label class="card__repeat-day" for="repeat-${key}-6">${key}</label>
    `;

    daysMarkdown.push(dayMarkdown);
  }

  return daysMarkdown.join(``);
};
