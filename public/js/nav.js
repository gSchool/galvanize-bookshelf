(function() {
  'use strict';

  $('.button-collapse').sideNav();

  window.COOKIES = {};
  document.cookie.split('; ').forEach((prop) => {
    const propKey = prop.split('=')[0];
    const propValue = prop.split('=')[1];

    window.COOKIES[propKey] = propValue;
  });

  if (window.COOKIES.loggedIn) {
    $('.session').text('Logout').click((_event) => {
      const $xhr = $.ajax({
        url: '/session',
        type: 'DELETE'
      });

      $xhr.done(() => {
        if ($xhr.status !== 200) {
          return Materialize.toast('Unable to log out. Please try again.');
        }

        window.location.href = '/';
      });

      $xhr.fail(() => {
        Materialize.toast('Unable to log out. Please try again.');
      });
    });
  }

  window.QUERY_PARAMETERS = {};
  if (window.location.search) {
    // strip the leading ? on the query parameters string
    window.location.search.substr(1).split('&').forEach((paramStr) => {
      const param = paramStr.split('=');

      window.QUERY_PARAMETERS[param[0]] = param[1];
    });
  }
})();
