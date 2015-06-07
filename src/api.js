'use strict';

import _ from 'lodash';
import request from 'superagent';

const BASE_URL = 'https://api.genius.com/';
const AUTH_URL = 'https://api.genius.com/oauth/authorize';

class Api {
  constructor(accessToken, options) {
    if (!accessToken) {
      throw new Error('Cannot instantiate genius-api without an access token');
    }

    let defaults = {

    };

    this.options = options || defaults;

    let a = new Authenticator({
      client_id: 1
    });
  }

  songs(id) {
    var promise = new Promise(function(resolve, reject) {
      request.get(BASE_URL + 'songs/' + id)
      .end(function(err, res) {
        if (err) {
          reject(err);
        }

        resolve(res);
      })
    });

    return promise;
  }
}

const privateData = new WeakMap();

class Authenticator {
  constructor() {
    privateData.set(this, {
      doAuth: function(authInfo) {
        var promise = new Promise(function(resolve, reject) {
          request.get(AUTH_URL)
          .query({
            client_id: authInfo.client_id,
            redirect_uri: authInfo.redirect_uri,
            scope: authInfo.scope,
            state: authInfo.state,
            response_type: authInfo.response_type
          })
          .end(function(err, res) {
            if (err) {
              reject(err);
            }

            resolve(res);
          });
        });

        return promise;
      }
    })
  }

  auth(authInfo) {
    if (!authInfo) {
      throw new Error('authInfo is null');
    }

    if (!_.has(authInfo, 'client_id')) {
      throw new Error('missing client_id')
    }

    if (!_.has(authInfo, 'redirect_uri')) {
      throw new Error('missing redirect_uri')
    }

    if (!_.has(authInfo, 'scope')) {
      throw new Error('missing scope')
    }

    if (!_.has(authInfo, 'state')) {
      throw new Error('missing state')
    }

    if (!_.has(authInfo, 'response_type')) {
      authInfo.response_type = 'code';
    }

    return privateData.get(this).doAuth(authInfo);
  }
}

export { Api, Authenticator }
