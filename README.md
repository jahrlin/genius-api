# genius-api [![Build Status](https://travis-ci.org/jahrlin/genius-api.svg?branch=master)](https://travis-ci.org/jahrlin/genius-api) [![npm version](https://badge.fury.io/js/genius-api.svg)](http://badge.fury.io/js/genius-api)

by Joakim Ahrlin

node.js client for the [Genius API](https://docs.genius.com)

uses [ES6 promises](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) to avoid callback hell.

## installation
```bash
$ npm install genius-api --save
```

## usage
more information about the different options can be found in the [Genius API docs](https://docs.genius.com/)
```js
var api = require('genius-api');
var genius = new api(process.env.GENIUS_CLIENT_ACCESS_TOKEN);

//get annotation
genius.annotation(6737668).then(function(response) {
  console.log(response.annotation);
});

//get referents by song_id, with options
genius.referents({song_id: 378195}, {per_page: 2}).then(function(response) {
  console.log('referents', response.referents);
});

//get referents by web_page_id, with options
genius.referents({web_page_id: 10347}, {per_page: 5}).then(function(response) {
  console.log('referents', response.referents);
});

//get song
genius.song(378195).then(function(response) {
  console.log('song', response.song);  
});

//get artist
genius.artist(16775).then(function(response) {
  console.log('artist', response.artist);
});

//get web page, with options
genius.webPage({raw_annotatable_url: 'https://docs.genius.com'}).then(function(response) {
  console.log('web page', response.web_page);
});

//search
genius.search('Run the Jewels').then(function(response) {
  console.log('hits', response.hits);
});

//error handling á la promise
genius.song(378195).then(function(response) {
  console.log('song', response.song);
}).catch(function(error) {
  console.error(error);
});
```

## tests
```bash
$ git clone https://github.com/jahrlin/genius-api.git
$ cd genius-api
$ GENIUS_CLIENT_ACCESS_TOKEN={ACCESS_TOKEN} mocha
```
