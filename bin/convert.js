var cli = require('cli')
  ; importer = require('../lib/importer.js')
  ; exporter = require('../lib/exporter.js')

cli.parse({
  verbose: ['v', 'Display Info'],
  inputType: ['i', 'Type of the input file', 'string', 'sketch'],
  outputType: ['o', 'Type of the output file', 'string', 'oco']
});


cli.main(function(args, options) {
  if(args.length < 2) {
    this.error("No SRC and DEST found.")
    this.info("bin/convert.js SRC DEST")
    return;
  }

  var src = args[0];
  var dest = args[1];

  // check if file exists


  var type = options.inputType;
  var palette = importer.importFile(type, src);

  

  //console.log(JSON.stringify(data));

  exporter.exportToFile(palette, options.outputType, dest);


})