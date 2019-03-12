import moment from 'moment';
import flatpickr from 'flatpickr';

import Component from './component';

export default class TaskEdit extends Component {

  constructor(data) {
    super();

    this._title = data.title;
    this._tags = data.tags;
    this._color = data.color;
    this._picture = data.picture;
    this._dueDate = data.dueDate;
    this._repeatingDays = data.repeatingDays;

    this._onSubmit = null;
    this._onCancel = null;

    this._state = {
      isDate: false,
      isRepeated: this._isRepeated()
    };

    this._onChangeDate = this._onChangeDate.bind(this);
    this._onChangeRepeated = this._onChangeRepeated.bind(this);
    this._onEscKeyup = this._onEscKeyup.bind(this);
    this._onSubmitButtonClick = this._onSubmitButtonClick.bind(this);

    this._colors = [
      `black`,
      `yellow`,
      `blue`,
      `green`,
      `pink`,
    ];

  }

  get template() {
    return `<article class=" card card--edit card--${this._color} ${this._isRepeated() ? `card--repeat` : ``} ${this._isOverdue() ? `card--deadline` : ``}">
							<form class="card__form" method="get">
								<div class="card__inner">
									<div class="card__control">
										<button type="button" class="card__btn card__btn--edit">
											edit
										</button>
										<button type="button" class="card__btn card__btn--archive">
											archive
										</button>
										<button type="button" class="card__btn card__btn--favorites">
											favorites
										</button>
									</div>
	
									<div class="card__color-bar">
										<svg class="card__color-bar-wave" width="100%" height="10">
											<use xlink:href="#wave"></use>
										</svg>
									</div>
	
									<div class="card__textarea-wrap">
										<label>
											<textarea class="card__text" placeholder="Start typing your text here..." name="text">${this._title}</textarea>
                  </label>
                </div>

                <div class="card__settings">
                  <div class="card__details">
                    <div class="card__dates">
                      <button class="card__date-deadline-toggle" type="button">
                        date: 
                        <span class="card__date-status">
                            ${this._state.isDate ? `yes` : `no`}
                        </span>
                      </button>

                      <fieldset class="card__date-deadline" ${!this._state.isDate && `disabled`}>
                        <label class="card__input-deadline-wrap">
                          <input class="card__date" type="text" placeholder="${this._getDueDate()}" name="date" value="${this._getDueDate()}">
                        </label>
                        <label class="card__input-deadline-wrap">
                          <input class="card__time" type="text" placeholder="${this._getDueTime()}" name="time" value="${this._getDueTime()}">
                        </label>
                      </fieldset>

                      <button class="card__repeat-toggle" type="button">
                        repeat:
                        <span class="card__repeat-status">
                            ${this._state.isRepeated ? `yes` : `no`}
                        </span>
                        </button>
  
                        <fieldset class="card__repeat-days" ${!this._state.isRepeated && `disabled`}>
                          <div class="card__repeat-days-inner">
                            ${this._repeatDaysMarkdown()}
                        </div>
                      </fieldset>
                    </div>

                    <div class="card__hashtag">
                      <div class="card__hashtag-list">
                        ${this._tagsMarkdown()}
                      </div>

                      <label>
                        <input type="text" class="card__hashtag-input" name="hashtag-input" placeholder="Type new hashtag here">
                      </label>
                    </div>
                  </div>

                  <label class="card__img-wrap">
                    <input type="file" class="card__img-input visually-hidden" name="img">
                    <img src="${this._picture}" alt="task picture" class="card__img">
                  </label>

                  <div class="card__colors-inner">
                    <h3 class="card__colors-title">Color</h3>
                    <div class="card__colors-wrap">
                        ${this._colorsMarkdown()}
                    </div>
                  </div>
                </div>

                <div class="card__status-btns">
                  <button class="card__save" type="submit">save</button>
                  <button class="card__delete" type="button">delete</button>
                </div>
              </div>
            </form>
          </article>`.trim();
  }

  set onSubmit(fn) {
    if (typeof fn === `function`) {
      this._onSubmit = fn;
    }
  }

  set onCancel(fn) {
    if (typeof fn === `function`) {
      this._onCancel = fn;
    }
  }

  update(data) {
    this._title = data.title;
    this._tags = data.tags;
    this._color = data.color;
    this._dueDate = data.dueDate;
    this._repeatingDays = data.repeatingDays;
  }

  _isRepeated() {
    return Object
      .values(this._repeatingDays)
      .some((item) => item === true);
  }

  _isOverdue() {
    return moment().unix() > this._dueDate;
  }

  _getDueDate() {
    return moment.unix(this._dueDate).format(`DD MMMM`);
  }

  _getDueTime() {
    return moment.unix(this._dueDate).format(`LT`);
  }

  _repeatDaysMarkdown() {
    return Object.entries(this._repeatingDays).map(([key, value]) => {
      return `<input 
                class="visually-hidden card__repeat-day-input" 
                type="checkbox" 
                id="repeat-${key}-6" 
                name="repeat" 
                value="${key}" 
                ${value ? `checked` : ``}>
            <label class="card__repeat-day" for="repeat-${key}-6">${key}</label>`.trim();
    }).join(``);
  }

  _tagsMarkdown() {
    return [...this._tags]
      .map((item) => {
        return `<span class="card__hashtag-inner">
              <input type="hidden" name="hashtag" value="repeat" class="card__hashtag-hidden-input">
              <button type="button" class="card__hashtag-name">
                #${item}
              </button>
              <button type="button" class="card__hashtag-delete">
                delete
              </button>
            </span>
        `.trim();
      }).join(``);
  }

  _colorsMarkdown() {
    return this._colors.map((item, index) => {
      return `
      <input type="radio" 
        id="color-${item}-${index + 1}" 
        class="card__color-input card__color-input--${item} visually-hidden" 
        name="color" 
        value="${item}"
        ${item === this._color ? `checked` : ``}>
      <label for="color-${item}-${index + 1}" class="card__color card__color--${item}">${item}</label>
    `.trim();
    }).join(``);
  }

  _partialUpdate() {
    this._element.innerHTML = this.template;
  }

  _bind() {
    document.addEventListener(`keyup`, this._onEscKeyup);
    this._element
      .querySelector(`.card__form`)
      .addEventListener(`submit`, this._onSubmitButtonClick);
    this._element
      .querySelector(`.card__date-deadline-toggle`)
      .addEventListener(`click`, this._onChangeDate);
    this._element
      .querySelector(`.card__repeat-toggle`)
      .addEventListener(`click`, this._onChangeRepeated);

    if (this._state.isDate) {
      flatpickr(`.card__date`, {altInput: true, altFormat: `j F`, dateFormat: `j F`});
      flatpickr(`.card__time`, {enableTime: true, noCalendar: true, altInput: true, altFormat: `h:i K`, dateFormat: `h:i K`});
    }
  }

  _unbind() {
    document.removeEventListener(`keyup`, this._onEscKeyup);
    this._element
      .querySelector(`.card__form`)
      .removeEventListener(`submit`, this._onSubmitButtonClick);
    this._element
      .querySelector(`.card__form`)
      .removeEventListener(`submit`, this._onSubmitButtonClick);
    this._element
      .querySelector(`.card__date-deadline-toggle`)
      .removeEventListener(`click`, this._onChangeDate);
    this._element
      .querySelector(`.card__repeat-toggle`)
      .removeEventListener(`click`, this._onChangeRepeated);
  }

  _onEscKeyup(evt) {
    if (evt.key === `Escape`) {
      this._onCancel();
    }
  }

  _onSubmitButtonClick(evt) {
    evt.preventDefault();
    const formData = new FormData(this._element.querySelector(`.card__form`));
    const newData = TaskEdit.processForm(formData);
    this._onSubmit(newData);

    this.update(newData);
  }

  _onChangeDate() {
    this._state.isDate = !this._state.isDate;
    this._unbind();
    this._partialUpdate();
    this._bind();
  }

  _onChangeRepeated() {
    this._state.isRepeated = !this._state.isRepeated;
    this._unbind();
    this._partialUpdate();
    this._bind();
  }

  static createMapper(target) {
    return {
      hashtag: (value) => target.tags.add(value),
      text: (value) => target.title = value,
      color: (value) => target.color = value,
      picture: (value) => target.picture = value,
      repeat: (value) => target.repeatingDays[value] = true,
      date: (value) => target.dueDate[value],
    };
  }

  static processForm(formData) {
    const entry = {
      title: ``,
      color: ``,
      tags: new Set(),
      dueDate: new Date(),
      repeatingDays: {
        'mo': false,
        'tu': false,
        'we': false,
        'th': false,
        'fr': false,
        'sa': false,
        'su': false,
      }
    };

    const taskEditMapper = TaskEdit.createMapper(entry);

    for (const pair of formData.entries()) {
      const [property, value] = pair;
      if (taskEditMapper[property]) {
        taskEditMapper[property](value);
      }
    }

    return entry;
  }

}

