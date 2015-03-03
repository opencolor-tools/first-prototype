;

module.exports.write = function(palette) {
  var output = {};
  output['name'] = palette.getName();

  var groups = [];
  var subPalettes = palette.getPalettes();

  for(k in subPalettes) {
    var group = {};
    var colors = [];
    var subPalette = subPalettes[k];
    var colorsData = subPalette.getColors();
    // @todo: flatten subpalettes in subpalettes
    for(colorName in colorsData) {
      colorObj = colorsData[colorName];
      colors.push({name: colorName, hex: colorObj.asHexString()})
    }
    group['name'] = subPalette.getName();
    group['colors'] = colors;
    groups.push(group);
  }

  // add group for colors at level0
  var rootColors = palette.getColors();
  var group = {};
  group['name'] = palette.getName();
  var colors = [];
  for(colorName in rootColors) {
    console.log(colorName)
    colorObj = rootColors[colorName];
    colors.push({name: colorName, hex: colorObj.asHexString()})
  }
  group['colors'] = colors;
  if(group['colors'].length) {
    groups.push(group);
  }

  output['colorGroups'] = groups;

  console.log(output);

  return JSON.stringify(output, null, '  ');
}