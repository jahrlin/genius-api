'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _superagent = require('superagent');

var _superagent2 = _interopRequireDefault(_superagent);

var BASE_URL = 'https://api.genius.com/';
var AUTH_URL = 'https://api.genius.com/oauth/authorize';

var Api = (function () {
  function Api(accessToken, options) {
    _classCallCheck(this, Api);

    if (!accessToken) {
      throw new Error('Cannot instantiate genius-api without an access token');
    }

    var defaults = {};

    this.options = options || defaults;

    var a = new Authenticator({
      client_id: 1
    });
  }

  _createClass(Api, [{
    key: 'songs',
    value: function songs(id) {
      var promise = new Promise(function (resolve, reject) {
        _superagent2['default'].get(BASE_URL + 'songs/' + id).end(function (err, res) {
          if (err) {
            reject(err);
          }

          resolve(res);
        });
      });

      return promise;
    }
  }]);

  return Api;
})();

var privateData = new WeakMap();

var Authenticator = (function () {
  function Authenticator() {
    _classCallCheck(this, Authenticator);

    privateData.set(this, {
      doAuth: function doAuth(authInfo) {
        var promise = new Promise(function (resolve, reject) {
          _superagent2['default'].get(AUTH_URL).query({
            client_id: authInfo.client_id,
            redirect_uri: authInfo.redirect_uri,
            scope: authInfo.scope,
            state: authInfo.state,
            response_type: authInfo.response_type
          }).end(function (err, res) {
            if (err) {
              reject(err);
            }

            resolve(res);
          });
        });

        return promise;
      }
    });
  }

  _createClass(Authenticator, [{
    key: 'auth',
    value: function auth(authInfo) {
      if (!authInfo) {
        throw new Error('authInfo is null');
      }

      if (!_lodash2['default'].has(authInfo, 'client_id')) {
        throw new Error('missing client_id');
      }

      if (!_lodash2['default'].has(authInfo, 'redirect_uri')) {
        throw new Error('missing redirect_uri');
      }

      if (!_lodash2['default'].has(authInfo, 'scope')) {
        throw new Error('missing scope');
      }

      if (!_lodash2['default'].has(authInfo, 'state')) {
        throw new Error('missing state');
      }

      if (!_lodash2['default'].has(authInfo, 'response_type')) {
        authInfo.response_type = 'code';
      }

      return privateData.get(this).doAuth(authInfo);
    }
  }]);

  return Authenticator;
})();

exports.Api = Api;
exports.Authenticator = Authenticator;