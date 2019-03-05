import {createElement} from './util';
import moment from 'moment';

export default class Task {

  constructor(data) {
    this._title = data.title;
    this._tags = data.tags;
    this._color = data.color;
    this._picture = data.picture;
    this._dueDate = data.dueDate;
    this._repeatingDays = data.repeatingDays;

    this._element = null;
    this._onEdit = null;
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

  _onEditButtonClick() {
    return this._onEdit();
  }

  _bind() {
    this._element
      .querySelector(`.card__btn--edit`)
      .addEventListener(`click`, this._onEditButtonClick.bind(this));
  }

  _unbind() {
    this._element.removeEventListener(`click`, this._onEditButtonClick.bind(this));
  }

  set onEdit(fn) {
    if (fn === `function`) {
      this._onEdit = fn;
    }
  }

  get element() {
    return (this._element)
      ? this._element
      : this.render();
  }

  get tagsMarkdown() {
    return this._tagsMarkdown;
  }

  get template() {
    return `<article class="card card--${this._color} ${this._isRepeated() ? `card--repeat` : ``} ${this._isOverdue() ? `card--deadline` : ``}">
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
                      <fieldset class="card__date-deadline">
                        <label class="card__input-deadline-wrap">
                          <input class="card__date" type="text" placeholder="${this._getDueDate()}" name="date" value="${this._getDueDate()}">
                        </label>
                        <label class="card__input-deadline-wrap">
                          <input class="card__time" type="text" placeholder="${this._getDueTime()}" name="time" value="${this._getDueTime()}">
                        </label>
                      </fieldset>
                    </div>

                    <div class="card__hashtag">
                      <div class="card__hashtag-list">
                        ${this.tagsMarkdown()}
                      </div>
                      
                    </div>
                  </div>

                  <label class="card__img-wrap">
                    <input type="file" class="card__img-input visually-hidden" name="img">
                    <img src="${this._picture}" alt="task picture" class="card__img">
                  </label>

                </div>

                <div class="card__status-btns">
                  <button class="card__save" type="submit">save</button>
                  <button class="card__delete" type="button">delete</button>
                </div>
              </div>
          </article>`.trim();
  }

  render() {
    this._element = createElement(this.template);
    this._bind();
    return this._element;
  }

  unrender() {
    this._unbind();
    this._element = null;
  }

}
