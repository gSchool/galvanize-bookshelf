(function() {
  'use strict';

  if (window.COOKIES.loggedIn) {
    window.location.href = '/';

    return;
  }

  $('.login').click((_event) => {
    const email = $('#email').val().trim();
    const password = $('#password').val();

    // Validation
    if (!email) {
      return Materialize.toast('Please enter an email.', 2000);
    }

    if (email.indexOf('@') < 0) {
      return Materialize.toast('Please enter a valid email.', 2000);
    }

    if (!password) {
      return Materialize.toast('Please enter a password.', 2000);
    }

    const $xhr = $.ajax({
      url: '/session',
      type: 'POST',
      contentType: 'application/json',
      data: JSON.stringify({ email, password })
    });

    $xhr.done(() => {
      if ($xhr.status !== 200) {
        Materialize.toast('User could not be logged in. Please try again.');

        return;
      }

      window.location.href = '/';
    });

    $xhr.fail(() => {
      Materialize.toast('User could not be logged in. Please try again.');
    });
  });
})();
