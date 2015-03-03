var jsyaml = require('js-yaml')
  , ocoYaml = require('../lib/oco-yaml-types.js')
  ;

module.exports.write = function(palette) {

  var output = {};

  function exportPalette(palette, isPaletteInPalette) {

    console.log(typeof palette);

    var o = {};
    if(!isPaletteInPalette) {
      o.name = palette.getName();
    }
    o.colors = {};

    var subPalettes = palette.getPalettes();
    for(k in subPalettes) {
      o.colors[k] = exportPalette(subPalettes[k], true);
    }

    var colors = palette.getColors();
    for(k in colors) {
      o.colors[k] = colors[k].asYAMLString();
    }

    if(!isPaletteInPalette) {
      return o;
    }
    
    return o.colors
  }

  output = exportPalette(palette);

  return jsyaml.safeDump(output, {schema: ocoYaml.OCO_SCHEMA});
}