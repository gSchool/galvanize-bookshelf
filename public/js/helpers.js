(function() {
  'use strict';

  const toCamelCase = function(output) {
    const updatedOutput = {};
    const find = /(_\w)/g;
    const convert = function(matches) {
      return matches[1].toUpperCase();
    };

    for (const key in output) {
      updatedOutput[key.replace(find, convert)] = output[key];
    }

    return updatedOutput;
  };

  const toSnakeCase = function(output) {
    const updatedOutput = {};
    const find = /([A-Z])/g;
    const convert = function(matches) {
      return `_${matches.toLowerCase()}`;
    };

    for (const key in output) {
      updatedOutput[key.replace(find, convert)] = output[key];
    }

    return updatedOutput;
  };

  const displayResources = function(resourceName, convert, callback) {
    const plural = `${resourceName}s`;
    const $xhr = $.getJSON(`/${plural}`);

    $xhr.done((resources) => {
      if ($xhr.status !== 200) {
        const errorStr = `Unable to retrieve ${plural}. Please try again.`;

        return Materialize.toast(errorStr, 2000);
      }

      if (!window.BONUS_CONFIG.CAMEL_CASE) {
        resources = resources.map(toCamelCase);
      }

      return callback(resources.map((resource) => {
        // Conform to a certain structure for use below
        const converted = convert(resource);
        const $resource = $(`<div class="${resourceName}">`)
          .addClass('col s12 m4 l3 center-align');
        const $a = $(`<a href="${resourceName}.html?id=${converted.id}">`);
        const $link = $('<div>')
          .append($a.clone().text(converted.title));
        const $img = $('<img>')
          .attr('src', converted.imageUrl)
          .attr('alt', converted.title);

        $resource.append($('<div>').append($a.append($img)));
        $resource.append($link);

        return $resource;
      }));
    });
  };

  const updateResource = function(resourceName, data, callback) {
    let $xhr;

    if (!window.BONUS_CONFIG.CAMEL_CASE) {
      data = toSnakeCase(data);
    }

    const dataJSON = JSON.stringify(data);

    if (window.QUERY_PARAMETERS.id) {
      $xhr = $.ajax({
        url: `/${resourceName}s/${window.QUERY_PARAMETERS.id}`,
        type: 'PATCH',
        contentType: 'application/json',
        data: dataJSON
      });
    }
    else {
      $xhr = $.ajax({
        url: `/${resourceName}s`,
        type: 'POST',
        contentType: 'application/json',
        data: dataJSON
      });
    }

    $xhr.done((author) => {
      if ($xhr.status !== 200) {
        Materialize.toast('Save failed. Please try again.', 2000);
      }

      callback(window.BONUS_CONFIG.CAMEL_CASE ? author : toCamelCase(author));
    });

    $xhr.fail(() => {
      Materialize.toast('Save failed. Please try again.', 2000);
    });
  };

  const deleteResource = function(resourceName) {
    const plural = `${resourceName}s`;

    return function(_event) {
      const $delXhr = $.ajax({
        url: `/${plural}/${window.QUERY_PARAMETERS.id}`,
        type: 'DELETE'
      });

      $delXhr.done(() => {
        if ($delXhr.status !== 200) {
          Materialize.toast('Delete failed. Please try again.', 2000);
        }

        window.location.href = `${plural}.html`;
      });

      $delXhr.fail(() => {
        Materialize.toast('Delete failed. Please try again.', 2000);
      });
    };
  };

  const getState = function(requestMap, callback) {
    const state = {};
    let requestCompletedCount = 0;
    const requestCount = Object.keys(requestMap).length;
    let requestUrl;
    let $xhr;

    for (const stateName in requestMap) {
      requestUrl = requestMap[stateName];
      $xhr = $.getJSON(requestUrl);
      (function($innerXhr, stateName) {
        const errorStr = `Unable to retrieve ${stateName}. Please try again.`;

        $innerXhr.done((resBody) => {
          if ($innerXhr.status !== 200) {
            return Materialize.toast(errorStr, 2000);
          }

          if (window.BONUS_CONFIG.CAMEL_CASE) {
            state[stateName] = resBody;
          }
          else if (Array.isArray(resBody)) {
            state[stateName] = resBody.map(toCamelCase);
          }
          else {
            state[stateName] = toCamelCase(resBody);
          }

          requestCompletedCount += 1;
          if (requestCount === requestCompletedCount) {
            return callback(state);
          }
        });

        $innerXhr.fail(() => {
          if ($innerXhr.status === 404) {
            state[stateName] = null;
            requestCompletedCount += 1;
            if (requestCount === requestCompletedCount) {
              return callback(state);
            }

            return;
          }

          return Materialize.toast(errorStr, 2000);
        });
      })($xhr, stateName);
    }
  };

  window.HELPERS = {
    displayResources,
    updateResource,
    deleteResource,
    getState,
    toCamelCase,
    toSnakeCase
  };
})();
