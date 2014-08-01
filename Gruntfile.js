var pkgjson = require('./package.json');
 
var config = {
  pkg: pkgjson,
  app: 'src',
  dist: 'dist'
}
 
module.exports = function (grunt) {
 
  // Configuration
  grunt.initConfig({
    config: config,
    pkg: config.pkg,
    bower: grunt.file.readJSON('./.bowerrc'),
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> lib - v<%= pkg.version %> -' +
          '<%= grunt.template.today("yyyy-mm-dd") %> */'
      },
      dist: {
        files: {
          '<%= config.dist %>/js/lib.min.js': [
            '<%= bower.directory %>/angular/angular.js',
            '<%= config.app %>/ng-i18nFilter.js'
          ],
            '<%= config.app %>/ng-i18nFilter.min.js': [
            '<%= config.app %>/ng-i18nFilter.js'
          ]
        }
      }
    },
    copy: {
      dist: {
       files: [{
         expand: true,
         cwd: '<%= config.app %>',
         src: 'ng-i18nFilter.js',
         dest: '<%= config.dist %>/js'
       },{
         expand: true,
         cwd: '<%= config.app %>',
         src: 'ng-i18nFilter.min.js',
         dest: '<%= config.dist %>/js'
       }]
      }
    },
  });
 
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-uglify');
 
  grunt.registerTask('default', [
    'copy',
    'uglify'
  ]);
};