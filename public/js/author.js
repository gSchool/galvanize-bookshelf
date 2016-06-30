(function() {
  'use strict';

  const {
    getState,
    deleteResource,
    updateResource
  } = window.HELPERS;

  let state = {};
  const inputHTML = $('.author-metadata').html();
  const toEditMode = function() {
    $('.author-metadata').html(inputHTML);
    $('.author-metadata .first-name').val(state.author.firstName);
    $('.author-metadata .last-name').val(state.author.lastName);
    $('.author-metadata textarea').text(state.author.biography);
    $('.img-url').val(state.author.portraitUrl);
    $('.portrait-field').removeClass('hide');
    $('label').addClass('active');

    // Replace Actions with Save button
    $('.actions').addClass('hide');
    $('.save-action').removeClass('hide');
  };

  const toViewMode = function() {
    const $nameH1 = $('<h1>')
      .text(`${state.author.firstName} ${state.author.lastName}`);
    const $biographyP = $('<p>').addClass('flow-text')
      .text(state.author.biography);

    $('.author-metadata .name').replaceWith($nameH1);
    $('.author-metadata .biography').replaceWith($biographyP);
    $('.author img').attr('src', state.author.portraitUrl);
    $('.portrait-field').addClass('hide');
    $('.author-metadata label').remove();

    // Replace Actions with Save button
    $('.save-action').addClass('hide');
    $('.actions').removeClass('hide');
  };

  if (window.QUERY_PARAMETERS.id) {
    getState({
      author: `/authors/${window.QUERY_PARAMETERS.id}`,
      books: `/authors/${window.QUERY_PARAMETERS.id}/books`
    }, (completedState) => {
      state = completedState;
      toViewMode();

      $('.books').append(state.books.map((book) => {
        const row = $('<div class="row book">');
        const firstCol = $('<div class="col s10">');
        const secondCol = $('<div class="col s2">');
        const title = $('<a>')
          .attr('href', `book.html?id=${book.id}`)
          .text(book.title);
        const img = $('<img>')
          .attr('src', book.coverUrl)
          .attr('alt', book.title);

        row.append(firstCol.append(title));
        row.append(secondCol.append(img));

        return row;
      }));
    });
  }

  $('a.edit').click((_event) => {
    toEditMode();
  });

  $('a.save').click((_event) => {
    const firstName = $('.author-metadata .first-name').val().trim();
    const lastName = $('.author-metadata .last-name').val().trim();
    const biography = $('.author-metadata textarea').val().trim();
    const portraitUrl = $('.author .img-url').val().trim();

    if (!firstName) {
      return Materialize.toast('Please enter a first name', 2000);
    }

    if (!lastName) {
      return Materialize.toast('Please enter a last name', 2000);
    }

    if (!biography) {
      return Materialize.toast('Please add a biography', 2000);
    }

    if (!portraitUrl) {
      return Materialize.toast('Please enter an image url', 2000);
    }

    updateResource('author', { firstName, lastName, biography, portraitUrl },
      (author) => {
        state.author = author;
        toViewMode();
      });
  });

  $('.modal a.confirm-delete')
    .click(deleteResource('author'));

  $('a.delete').click((_event) => {
    if ($('.book').length > 0) {
      return Materialize.toast('Please remove all books for this author', 2000);
    }

    $('#confirm').openModal();
  });
})();
