(function() {
  'use strict';

  window.HELPERS.displayResources('author', (author) => {
    const name = `${author.firstName} ${author.lastName}`;

    return {
      id: author.id,
      title: name,
      imageUrl: author.portraitUrl
    };
  }, (authors) => {
    $('.authors .row').append(authors);
  });

  $('.parallax').parallax();
})();
