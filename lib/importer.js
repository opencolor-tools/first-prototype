var fs = require('fs')
  //, RSVP = require('rsvp')
  ; 

function readfile(filename) {
  return fs.readFileSync(filename);
}

function process(type, content) {
  var importerFile = '../importer/' + type + '-opencolor-importer.js';

  // check if importer eyists
  var importer = require(importerFile);
  var palette = importer.read(content);
  return palette;
}

module.exports.importFile = function importColorPalette(type, filename) {
  return process(type, readfile(filename));
}