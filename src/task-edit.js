import {createElement} from './util';
import moment from 'moment';

export default class TaskEdit {

  constructor(data) {
    this._title = data.title;
    this._tags = data.tags;
    this._color = data.color;
    this._picture = data.picture;
    this._dueDate = data.dueDate;
    this._repeatingDays = data.repeatingDays;

    this._element = null;
    this._onSubmit = null;

    this._colors = [
      `black`,
      `yellow`,
      `blue`,
      `green`,
      `pink`,
    ];
  }

  _isRepeated() {
    return Object
      .values(this._repeatingDays)
      .some((item) => item === true);
  }

  _isOverdue() {
    return moment().unix() > this._dueDate;
  }

  _onSubmitButtonClick(evt) {
    evt.preventDefault();
    return typeof this._onSubmit === `function` && this._onSubmit();
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
    return this._colors.map((item) => {
      return `
      <input type="radio" 
        id="color-${item}-6" 
        class="card__color-input card__color-input--${item} visually-hidden" 
        name="color" 
        value="${item}"
        ${item === this._color ? `checked` : ``}>
      <label for="color-${item}-6" class="card__color card__color--${item}">${item}</label>
    `.trim();
    }).join(``);
  }

  set onSubmit(fn) {
    this._onSubmit = fn;
  }

  get element() {
    return (this._element)
      ? this._element
      : this.render();
  }

  get repeatDaysMarkdown() {
    return this._repeatDaysMarkdown;
  }

  get tagsMarkdown() {
    return this._tagsMarkdown;
  }

  get colorsMarkdown() {
    return this._colorsMarkdown;
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
                        date: <span class="card__date-status">no</span>
                      </button>

                      <fieldset class="card__date-deadline">
                        <label class="card__input-deadline-wrap">
                          <input class="card__date" type="text" placeholder="${this._getDueDate()}" name="date" value="${this._getDueDate()}">
                        </label>
                        <label class="card__input-deadline-wrap">
                          <input class="card__time" type="text" placeholder="${this._getDueTime()}" name="time" value="${this._getDueTime()}">
                        </label>
                      </fieldset>

                      <button class="card__repeat-toggle" type="button">
                        repeat:<span class="card__repeat-status">no</span>
                      </button>

                      <fieldset class="card__repeat-days">
                        <div class="card__repeat-days-inner">
                            ${this.repeatDaysMarkdown()}
                        </div>
                      </fieldset>
                    </div>

                    <div class="card__hashtag">
                      <div class="card__hashtag-list">
                        ${this.tagsMarkdown()}
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
                        ${this.colorsMarkdown()}
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

  _bind() {
    this._element
      .querySelector(`.card__form`)
      .addEventListener(`submit`, this._onSubmitButtonClick.bind(this));
  }

  render() {
    this._element = createElement(this.template);
    this._bind();
    return this._element;
  }

  _unbind() {
    this._element.removeEventListener(`click`, this._onSubmitButtonClick.bind(this));
  }

  unrender() {
    this._unbind();
    this._element = null;
  }

}

