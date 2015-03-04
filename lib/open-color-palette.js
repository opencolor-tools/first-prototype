var _ = require('lodash')
  ;
OpenColorPalette = function OpenColorPalette(_name) {

  var name = _name ? _name : '';
  this.palettes = {};
  this.colors = {};

  this.setName = function(_name) {
    name = _name;
  }
  this.getName = function() {
    return name;
  }
}

OpenColorPalette.prototype.getPalettes = function() {
  return this.palettes;
}

OpenColorPalette.prototype.getColors = function() {
  return this.colors;
}

OpenColorPalette.prototype.getAllColors = function() {
  var colors = _.clone(this.colors);

  for(k in this.palettes) {
    _.merge(colors, this.palettes[k].getAllColors());
  }

  return colors;
}

OpenColorPalette.prototype.createSubPalette = function(name) {
  var palette = new OpenColorPalette(name);

  return this.addPalette(palette);
}

OpenColorPalette.prototype.addPalette = function(palette) {
  
  var name = palette.getName();

  if(this.colors[name]) {
    throw new Error('palette name exists as color name');
    return;
  }
  this.palettes[name] = palette;
  return palette;
}

OpenColorPalette.prototype.addColor = function(name, color) {

  if(this.palettes[name]) {
    throw new Error('color name exists as palette name');
    return;
  }
  this.colors[name] = color;
}

module.exports = OpenColorPalette;