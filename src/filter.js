import Component from './component';
import {getRandomInteger} from './util';

export default class Filter extends Component {
  constructor(data) {
    super();

    this._name = data.name;
    this._checked = data.checked;

    this._onFilter = null;

    this._onFilterClick = this._onFilterClick.bind(this);
  }

  get name() {
    return this._name.toLowerCase();
  }

  get template() {
    return `
    <span>
      <input type="radio"
                id="filter__${this.name}"
                class="filter__input visually-hidden"
                name="filter"
                ${(this._checked && `checked`)} 
      />
      <label for="filter__${this.name}" class="filter__label">
        ${this.name} <span class="filter__${this.name}-count">${getRandomInteger(1, 20)}</span>
      </label>
    `.trim();
  }

  set onFilter(fn) {
    if (typeof fn === `function`) {
      this._onFilter = fn;
    }
  }

  _bind() {
    this._element
      .querySelector(`.filter__input`)
      .addEventListener(`click`, this._onFilterClick);
  }

  _unbind() {
    this._element
      .querySelector(`.filter__input`)
      .removeEventListener(`click`, this._onFilterClick);
  }

  _onFilterClick() {
    return this._onFilter && this._onFilter();
  }
}
