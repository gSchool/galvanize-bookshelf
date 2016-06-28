(function() {
  'use strict';

  if (window.COOKIES.userId) {
    const container = $('<div class="container">');
    const h1 = $('<h1>').text('My Library');
    const row = $('<div class="row">');

    container.append(h1);
    container.append(row);

    const $xhr = $.getJSON(`/users/${window.COOKIES.userId}/books`);

    $xhr.done((books) => {
      if ($xhr.status !== 200) {
        Materialize.toast('Unable to retrieve books. Please try again.', 2000);

        return;
      }
      if (!window.BONUS_CONFIG.CAMEL_CASE) {
        books = books.map(window.HELPERS.toCamelCase);
      }

      let $book;
      let $img;
      let $a;
      let $link;

      for (const book of books) {
        $book = $('<div class="col s12 m4 l3 center-align book">');
        $a = $(`<a href="book.html?id=${book.bookId}">`);
        $link = $('<div>').append($a.clone().text(book.title));
        $img = $('<img>').attr('src', book.coverUrl).attr('alt', book.title);
        $book.append($('<div>').append($a.append($img)));
        $book.append($link);
        row.append($book);
      }

      $('main .container').replaceWith(container);
    });
  }

  $('.register').click((event) => {
    const firstName = $('#fname').val().trim();
    const lastName = $('#lname').val().trim();
    const email = $('#email').val().trim();
    const password = $('#password').val();
    const password2 = $('#password2').val();

    // Validation
    if (!firstName) {
      return Materialize.toast('Please enter a first name.', 2000);
    }

    if (!lastName) {
      return Materialize.toast('Please enter a last name.', 2000);
    }

    if (!email) {
      return Materialize.toast('Please enter an email.', 2000);
    }

    if (email.indexOf('@') < 0) {
      return Materialize.toast('Please enter a valid email.', 2000);
    }

    if (!password) {
      return Materialize.toast('Please enter a password.', 2000);
    }

    if (password !== password2) {
      return Materialize.toast('Passwords do not match.', 2000);
    }

    let json = { firstName, lastName, email, password };

    if (!window.BONUS_CONFIG.CAMEL_CASE) {
      json = window.HELPERS.toSnakeCase(json);
    }
    const $xhr = $.ajax({
      url: '/users',
      type: 'POST',
      contentType: 'application/json',
      data: JSON.stringify(json)
    });

    $xhr.done(() => {
      if ($xhr.status === 409) {
        return Materialize.toast('User already exists. Please login.');
      }

      if ($xhr.status !== 200) {
        Materialize.toast('User could not be created. Please try again.');

        return;
      }

      window.location.href = '/login.html';
    });

    $xhr.fail(() => {
      Materialize.toast('User could not be created. Please try again.');
    });
  });
})();
