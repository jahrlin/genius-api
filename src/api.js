var request = require('request');
var _ = require('lodash');

var BASE_URL = 'https://api.genius.com/';
var AUTH_URL = 'https://api.genius.com/oauth/authorize';

class Api {
  constructor(accessToken, options) {
    if (!accessToken) {
      //throw new Error('Cannot instantiate genius-api without an access token');
    }

    var defaults = {};

    this.options = options || defaults;
    this.at = accessToken;
    this.AuthHeader = {'Authentication': 'Bearer ' + this.at};
  }

  request(options, callback) {
    var defaultRequest = request.defaults({
      baseUrl: BASE_URL,
      headers: {'Authorization': 'Bearer ' + this.at}
    });

    let promise = new Promise(function(resolve, reject) {
      defaultRequest(options, function(err, response) {
        if (response.statusCode !== 200) {
          var payload = {
            'Error': response,
            'Status': response.statusCode
          };

          reject(payload);
        }

        resolve(response.body);
      });
    });

    return promise;
  }

  requestPromise(request) {
    let _this = this;

    return new Promise(function(resolve, reject) {
      _this.request(request).then(function(data) {
        resolve(JSON.parse(data).response);
      }).catch(function(data) {
        reject(JSON.parse(data.Error.body));
      });
    });
  }

  annotation(id, options) {
    let request = {
      url: 'annotations/' + id,
      qs: options
    };

    return this.requestPromise(request);
  }

  referents(id, options) {
    let request = {
      url: 'referents',
      qs: _.merge(id, options)
    }

    return this.requestPromise(request);
  }

  song(id, options) {
    let request = {
      url: 'songs/' + id,
      qs: options
    };

    return this.requestPromise(request);
  }

  artist(id, options) {
    let request = {
      url: 'artists/' + id,
      qs: options
    };

    return this.requestPromise(request);
  }

  songsByArtist(id, options) {
    let request = {
      url: 'artists/' + id + '/songs',
      qs: options
    };

    return this.requestPromise(request);
  }

  webPage(options) {
    let request = {
      url: 'web_pages/lookup',
      qs: options
    };

    return this.requestPromise(request);
  }

  search(query) {
    let request = {
      url: 'search',
      qs: {'q': query}
    }

    return this.requestPromise(request);
  }
}

module.exports = Api;
