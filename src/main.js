'use strict';

const filters = [
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

const randomInteger = (min, max) => {
  const rand = min - 0.5 + Math.random() * (max - min + 1);
  return Math.round(rand);
};

const getFilterItem = (filter) => {
  const lowerFilterName = filter.name.toLowerCase();
  const upperFilterName = filter.name.toUpperCase();

  return `<input type="radio"
                id="filter__${lowerFilterName}"
                class="filter__input visually-hidden"
                name="filter"
                ${(filter.disabled) ? `disabled` : ``}
                ${(filter.checked ? `checked` : ``)} />
      <label for="filter__${lowerFilterName}" class="filter__label">
        ${upperFilterName} <span class="filter__${lowerFilterName}-count">${randomInteger(1, 20)}</span>
      </label>`;
};

const renderFilter = (filter) => {
  const mainFilter = document.querySelector(`.main__filter`);
  mainFilter.insertAdjacentHTML(`beforeend`, getFilterItem(filter));
};

const renderAllFilters = (filtersArray) => {
  filtersArray.forEach((item) => renderFilter(item));
};

renderAllFilters(filters);

