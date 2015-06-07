var tap = require('tap');
var api = require('../index.js').Api;
var auth = require('../index.js').Authenticator;
var access_token = 'redacted';

tap.equal(1, 1, 'check for solar flares');

var myApi = new api(access_token);

var myAuth = new auth();

tap.test('api', function(t) {
  t.ok(myApi, 'api initilization ok');
  t.end();
});

tap.test('get song by id', function(t) {
  myApi.songs(378195)
  .then(function(result) {
    t.ok(result, 'get song 378195 ok');
    console.log(result);
    t.end();
  });
});

var authInfo = {
  client_id: 'L8wlgVYVAan5qAeg5LzZq2KKlIzHMKk7E72SD1vMDQimgyrzQd4nqfqFB5BDFFPW',
  redirect_uri: 'http://localhost:3000',
  scope: 'me',
  state: 'state?',
  response_type: 'code'
};

tap.test('auth', function (t) {
  var x = myAuth.auth(authInfo).then(function(result) {
    t.ok(result, 'result from Authenticator ok?');
    t.end();
  });
})
