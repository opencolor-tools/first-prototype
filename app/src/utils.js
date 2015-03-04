var fs = require('fs')
  , path = require('path')
  ;

module.exports.isDirectory = function(filepath) {
  try {
    // Query the entry
    stats = fs.lstatSync(filepath);

    // Is it a directory?
    if (stats.isDirectory()) {
      return true;
    }
    return false;
  }
  catch (e) {
    return false;
  }
}

module.exports.determineType = function(filepath) {
  var ext = path.extname(filepath);
  if(ext == '.aco') {
    return 'aco';
  }
  if(ext == '.yaml') {
    return 'oco';
  }
  if(ext == '.json') {
    return 'sketch';
  }
  return false;
}