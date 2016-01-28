var OpenColorPalette = require('../lib/open-color-palette.js')
  ; Color = require('../lib/open-color-color.js')
  ; less = require('less')
  ;

module.exports.read = function(content) {

  var palette = new OpenColorPalette();
  // var input = JSON.parse(content);

  var input = less.parse(content).then(function(tree) {
    console.log(tree);
  });

  console.log(input);

/*
  palette.setName(input['name']);
  input['colorGroups'].forEach(function(groupInput) {

    var subPalette = palette.createSubPalette(groupInput.name);

    groupInput['colors'].forEach(function(colorInput) {

      var c = new Color.fromHexString(colorInput.hex);
      subPalette.addColor(colorInput.name, c);
    });

  });
*/
  return palette;
}