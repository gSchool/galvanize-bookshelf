(function() {
  'use strict';

  $('.button-collapse').sideNav();

  $.getJSON('/token')
    .done((loggedIn) => {
      const $firstNavItems = $('.firstNavItem');
      const $secondNavItems = $('.secondNavItem');

      if (loggedIn) {
        const $favorites = $('<a>')
          .attr('href', '/favorites.html')
          .text('Favorites');

        const $logout = $('<a>').text('Log out');

        $logout.click((event) => {
          event.preventDefault();

          $.ajax({
            dataType: 'json',
            url: '/token',
            type: 'DELETE',
            success: (data) => {
              window.location.href = '/'
            },
            error: (res) => {
              window.location.href = '/'
            }

          })
        });

        $firstNavItems.append($favorites);
        $secondNavItems.append($logout);
      }
      else {
        const $signup = $('<a>')
          .attr('href', '/signup.html')
          .text('Sign up');

        const $login = $('<a>')
          .attr('href', '/login.html')
          .text('Log in');

        $firstNavItems.append($signup);
        $secondNavItems.append($login);
      }
    })
    .fail(($xhr) => {
      Materialize.toast($xhr.responseText, 3000);
    });

  window.QUERY_PARAMETERS = {};

  if (window.location.search) {
    window.location.search.substr(1).split('&').forEach((paramStr) => {
      const param = paramStr.split('=');

      window.QUERY_PARAMETERS[param[0]] = param[1];
    });
  }
})();
