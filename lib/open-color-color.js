var converter = require("color-convert")()
  , string = require("color-string")
  ;

var validTypes = ['rgbArray', 'hexString', 'rgbObject', 'hsvObject'];

var OpenColorColor = function OpenColorColor() {


  this.value = {
    r: 0,
    g: 0,
    b: 0
  };
  this.klass = 'OpenColorColor'

  var inputType, inputValue;
  function set(_type, _value) {
    inputType = _type;
    inputValue = _value;
  }

  function get(_type) {

    if(!inputValue) {
      return undefined;
    }

    if(inputType == _type) {
      return inputValue;
    }

    var converterMethodName = inputType + '_to_' + _type;
    if(!(converterMethodName in converters)) {
      throw new Error('OpenColorColor: can not convert from ' + inputType + ' to ' + _type);
    }
    var outputValue = converters[converterMethodName].call(this, inputValue);
    return outputValue;
  }

  var converters = {
    'hsvObject_to_hexString': function(i) {
      return string.hexString(converter.hsv([i.h, i.s, i.v]).rgb())
    }
  }

  
  var that = this;
  validTypes.forEach(function(type) {
    var typeName = capitalizeFirstLetter(type);
    that['from' + typeName] = function(value) {
      set(type, value);
    };
    that['as' + typeName] = function() {
      return get(type);
    };
  });
}

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

OpenColorColor.prototype.asYAMLString = function() {
  return this.asHexString().replace(/#/, '');
}

module.exports = OpenColorColor;

validTypes.forEach(function(type) {
  var typeName = capitalizeFirstLetter(type);
  module.exports['from' + typeName] = function(s) {
    var color = new OpenColorColor();
    color['from' + typeName](s);
    return color;
  }
})