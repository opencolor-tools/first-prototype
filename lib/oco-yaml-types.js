var jsyaml = require('js-yaml')
  ; OpenColorColor = require('./open-color-color.js')


var OpenColorColorYamlType = new jsyaml.Type('tag:yaml.org,2002:color', {
  // Loader must parse sequence nodes only for this type (i.e. arrays in JS terminology).
  // Other available kinds are 'scalar' (string) and 'mapping' (object).
  // http://www.yaml.org/spec/1.2/spec.html#kind//
  kind: 'scalar',

  // Loader must check if the input object is suitable for this type.
  resolve: function (data) {
    // `data` may be either:
    // - Null in case of an "empty node" (http://www.yaml.org/spec/1.2/spec.html#id2786563)
    // - Array since we specified `kind` to 'sequence'
    return data !== null && data.length === 6;
  },

  // If a node is resolved, use it to create a Point instance.
  construct: function (data) {
    return OpenColorColor.fromHexString(data);
  },

  // Dumper must process instances of Point by rules of this YAML type.
  instanceOf: OpenColorColor,

  // Dumper must represent Point objects as three-element sequence in YAML.
  represent: function (color) {
    return color.asHexString();
  }
});

var OCO_SCHEMA = jsyaml.Schema.create([ OpenColorColorYamlType ]);

module.exports.OCO_SCHEMA = OCO_SCHEMA;