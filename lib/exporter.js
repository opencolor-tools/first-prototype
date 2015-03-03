var fs = require('fs');

function readfile(filename) {
  return fs.readFileSync(filename);
}

function process(type, palette, filename) {
  var exporterFile = '../exporter/' + type + '-opencolor-exporter.js';

  // @todo: check if exporter eyists
  var exporter = require(exporterFile);
  var output = exporter.write(palette);

  fs.writeFileSync(filename, output);
}

module.exports.exportToFile = function exportColorPalette(palette, type, filename) {
  process(type, palette, filename)
}