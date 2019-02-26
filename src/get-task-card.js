import {getDateFromTimestamp, getTimeFromTimestamp} from './util';
import getTagsMarkdown from './get-tags-markdown';
import getCardColorsMarkdown from './get-card-colors-markdown';
import getRepeatDaysMarkdown from './get-repeat-days-markdown';

export default (task) => {
  return `<article class="card card--${task.color}">
            <form class="card__form" method="get">
              <div class="card__inner">
                <div class="card__control">
                  <button type="button" class="card__btn card__btn--edit">
                    edit
                  </button>
                  <button type="button" class="card__btn card__btn--archive ${task.isDone ? `card__btn--disabled` : ``}">
                    archive
                  </button>
                  <button type="button" class="card__btn card__btn--favorites ${task.isFavorite ? `card__btn--disabled` : ``}">
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
                    <textarea class="card__text" placeholder="Start typing your text here..." name="text">${task.title}</textarea>
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
                          <input class="card__date" type="text" placeholder="${getDateFromTimestamp(task.dueDate)}" name="date" value="${getDateFromTimestamp(task.dueDate)}">
                        </label>
                        <label class="card__input-deadline-wrap">
                          <input class="card__time" type="text" placeholder="${getTimeFromTimestamp(task.dueDate)}" name="time" value="${getTimeFromTimestamp(task.dueDate)}">
                        </label>
                      </fieldset>

                      <button class="card__repeat-toggle" type="button">
                        repeat:<span class="card__repeat-status">no</span>
                      </button>

                      <fieldset class="card__repeat-days">
                        <div class="card__repeat-days-inner">
                            ${getRepeatDaysMarkdown(task.repeatingDays)}
                        </div>
                      </fieldset>
                    </div>

                    <div class="card__hashtag">
                      <div class="card__hashtag-list">
                        ${getTagsMarkdown(task.tags)}
                      </div>

                      <label>
                        <input type="text" class="card__hashtag-input" name="hashtag-input" placeholder="Type new hashtag here">
                      </label>
                    </div>
                  </div>

                  <label class="card__img-wrap">
                    <input type="file" class="card__img-input visually-hidden" name="img">
                    <img src="${task.picture}" alt="task picture" class="card__img">
                  </label>

                  <div class="card__colors-inner">
                    <h3 class="card__colors-title">Color</h3>
                    <div class="card__colors-wrap">
                        ${getCardColorsMarkdown(task.color)}
                    </div>
                  </div>
                </div>

                <div class="card__status-btns">
                  <button class="card__save" type="submit">save</button>
                  <button class="card__delete" type="button">delete</button>
                </div>
              </div>
            </form>
          </article>`;
};
