var utils = require('./utils.js')
  , importer = require('./opencolor/lib/importer.js')
  , exporter = require('./opencolor/lib/exporter.js')
  , gui = require('nw.gui')
  ;

gui.Window.get().showDevTools();

window.addEventListener('dragover',function(e){e.preventDefault();return false;});
window.addEventListener('drop',function(e){e.preventDefault();return false;});

gui.Window.get().on('close', function() {

    // After closing the new window, close the main window.
    this.close(true);
});

function stateError(m) {
  alert(m);
}

$(document).ready(function() {


  var $input =  $('.input');
  var inputContainsFile = false;
  var $hint =  $input.find('.hint');
  var $info =  $input.find('.info');
  var $filename =  $input.find('.filename');
  var $colors =  $input.find('.colors');

  var $output =  $('.output');
  $output.hide();

  var palette;

  $output.find('button').click(function() {
    if(!palette) {
      return;
    }
    var $el = $(this);
    var type = $el.data('format');

    var ext = '';

    if(type == 'sketch') {
      ext = '.sketch.json';
    }
    if(type == 'oco') {
      ext = '.oco.yaml';
    }
    // open file save dialog

    var $dlg = $('<input type="file" nwsaveas="' + palette.getName() + ext + '" />');

    $dlg.change(function(evt) {
      var dest = $(this).val();

      if(!dest) {
        alert('canceled');
      }

      exporter.exportToFile(palette, type, dest);
      
    });

    $dlg.click();

  });

  function receivedFile(filepath) {

    // show state
    inputContainsFile = true;
    $filename.text(filepath);
    $hint.hide();
    $info.show();
    $dragTarget.removeClass('user-dropped-file');

    // determine if convertable

    // determins type
    var type = utils.determineType(filepath)

    // convert
    palette = importer.importFile(type, filepath);

    // display a preview
    $colors.html('');

    var i = 0;
    var colors = palette.getAllColors();
    for(name in colors) {
      if(i > 16) {
        continue;
      }
      $colors.append(
        '<div class="color" style="background-color:' + colors[name].asHexString() + '">' + name + '</div>'
        );
      i++;
    }

    // show output

    $output.show();
  }

  var $dragTarget = $('.target');

  $dragTarget.on('dragenter', function(e) {
    $dragTarget.addClass('user-is-dragging-over');
    $info.hide();
    $hint.show();
    $output.hide();
  });
  $dragTarget.on('dragleave', function(e) {
    $dragTarget.removeClass('user-is-dragging-over');

    if(inputContainsFile) {
      $info.show();
      $hint.hide();
      $output.show();
    }
  });
  $dragTarget.on('drop', function(e) {
    $dragTarget.removeClass('user-is-dragging-over');
    $dragTarget.addClass('user-dropped-file');
    e.preventDefault();
    var files = e.originalEvent.dataTransfer.files;
    if(files.length !== 1) {
      stateError("please drop one file?");
      return;
    }
    var dir = files[0].path;
    if(utils.isDirectory(dir)) {
      stateError("this is not a file, is it?");
      return;
    }
    receivedFile(files[0].path);
  });

});