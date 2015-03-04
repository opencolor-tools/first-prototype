module.exports = function(grunt) {
  grunt.loadNpmTasks('grunt-node-webkit-builder');
  grunt.loadNpmTasks('grunt-contrib-stylus');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.initConfig({

    copy: {
      prebuild: {
        files: [
          {expand: true, src: ['./{lib,exporter,importer}/**'], dest: 'app/build/opencolor'},
          {expand: true, cwd: './app/src/', src: ['*.{html,js,json}'], dest: 'app/build'}
        ]
      }
    },
    stylus: {
      app: {
        files: {
          './app/build/styles.css': './app/src/styles.styl'
        }
      }
    },
    nodewebkit: {
      options: {
        platforms: ['osx'],
        buildDir: './builds', // Where the build version of my node-webkit app is saved
      },
      src: ['./app/build/**/*'] // Your node-webkit app
    },
  });

  grunt.registerTask('openapp', 'Open App', function() {
    require('child_process').exec('open ./builds/opencolorconverter/osx64/opencolorconverter.app');
  });

  grunt.registerTask('build', ['copy:prebuild', 'stylus', 'nodewebkit']);
  grunt.registerTask('buildandopen', ['build', 'openapp']);
}