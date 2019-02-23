import {getRandomInteger} from "./util";

export default (filter) => {
  const lowerFilterName = filter.name.toLowerCase();
  const upperFilterName = filter.name.toUpperCase();

  return `<input type="radio"
                id="filter__${lowerFilterName}"
                class="filter__input visually-hidden"
                name="filter"
                ${(filter.disabled) ? `disabled` : ``}
                ${(filter.checked ? `checked` : ``)} />
      <label for="filter__${lowerFilterName}" class="filter__label">
        ${upperFilterName} <span class="filter__${lowerFilterName}-count">${getRandomInteger(1, 20)}</span>
      </label>`;
};
