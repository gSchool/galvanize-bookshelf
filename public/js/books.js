(function() {
  'use strict';

  window.HELPERS.displayResources('book', (book) => {
    return {
      id: book.id,
      title: book.title,
      imageUrl: book.coverUrl
    };
  }, (books) => {
    $('.books .row').append(books);
  });

  $('.parallax').parallax();
})();
