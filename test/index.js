var chai = require('chai');
var should = require('chai').should()
var chaiAsPromised = require('chai-as-promised');
var api = require('../dist/api.js');
chai.use(chaiAsPromised);

var access_token = process.env.GENIUS_CLIENT_ACCESS_TOKEN;
var genius = new api(access_token);

describe('api', function(){
  describe('GET song by ID 378195', function() {
    it('should be an object, with expected keys', function() {
      return genius.song(378195).then(function(data) {
        //song test, kinda half-assed but gets the point across
        data.song.should.have.any.keys(['media', 'title', 'annotation_count', 'description', 'api_path', 'primary_artist']);
      }).catch(function(error) {
        console.log('err', data);
      });
    });
  });

  // describe('GET annotations by ID 6737668', function() {
  //   it('should be an object, with expected keys', function () {
  //     return genius.annotation(6737668).then(function(data) {
  //       data.annotation.should.have.any.keys(['share_url', 'body', 'id', 'url']);
  //     });
  //   });
  // });

  // describe('GET referents by song_id 378195', function() {
  //   it('should be an Array[2], first object with expected keys', function () {
  //     return genius.referents({song_id: 378195}, {per_page: 2}).then(function(data) {
  //       data.referents.should.be.an('array');
  //       data.referents.should.have.length(2);

  //       data.referents[0].should.have.any.keys(['classification', 'path', 'id']);
  //     });
  //   });
  // });

  // describe('GET referents by web_page_id 10347', function() {
  //   it('should be an Array[5], first object with expected keys', function () {
  //     return genius.referents({web_page_id: 10347}, {per_page: 5}).then(function(data) {
  //       data.referents.should.be.an('array');
  //       data.referents.should.have.length(5);

  //       data.referents[0].should.have.any.keys(['classification', 'path', 'id']);
  //     });
  //   });
  // });

  // describe('GET artist by ID 16775', function() {
  //   it('should be an object, with expected keys', function () {
  //     return genius.artist(16775).then(function(data) {
  //       data.artist.should.have.any.keys(['id', 'url', 'name']);
  //     });
  //   });
  // });

  // describe('GET songs by artist with ID 1421', function() {
  //   it('should return Array[5], first object with expected song keys', function () {
  //     return genius.songsByArtist(1421, {per_page: 5}).then(function(data) {
  //       data.songs.should.have.length(5);
  //       data.songs[0].should.have.any.keys(['title', 'id', 'url']);
  //     });
  //   });
  // });

  // describe('GET webpage by URL https://docs.genius.com', function() {
  //   it('should return an object with expected keys', function() {
  //     return genius.webPage({raw_annotatable_url: 'https://docs.genius.com'}).then(function(data) {
  //       data.web_page.should.have.any.keys(['title', 'id', 'url']);
  //     });
  //   });
  // });

  // describe('GET search with query "Kendrick Lamar"', function() {
  //   it('should return array of songs', function() {
  //     return genius.search('Kendrick Lamar').then(function(data) {
  //       data.hits.should.be.an('array');
  //       data.hits[0].should.have.all.keys(['result', 'highlights']);
  //       data.hits[0].result.should.have.any.keys(['title', 'id', 'url']);
  //     });
  //   });
  // });
});
