const TAGS_COUNT = 3;

export default (tags) => {
  const tagsMarkdown = [...tags]
    .sort(() => 0.5 - Math.random())
    .splice(0, TAGS_COUNT)
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
        `;
    });

  return tagsMarkdown.join(``);
};
