var OpenColorPalette = require('../lib/open-color-palette.js')
  , Color = require('../lib/open-color-color.js')
  , jsyaml = require('js-yaml')
  , ocoYaml = require('../lib/oco-yaml-types.js')
  ;

module.exports.read = function(content) {

  var input = jsyaml.load(content);

  console.log(input);

  function makePaletteObject(name, palette) {
    var subPalette = new OpenColorPalette();
    subPalette.setName(name);

    for(key in palette) {
      var val = palette[key];
      var type = Object.prototype.toString.call(val);
      if('[object Object]' === type) {
        subPalette.addPalette(makePaletteObject(key, val));
      } else if (
        '[object Number]' === type
        || '[object String]' === type) {

        var c = new Color.fromHexString(val.toString());
        subPalette.addColor(key, c);
      }
    }
    return subPalette;
  }

  palette = makePaletteObject(input['name'], input['colors']);


  return palette;
}