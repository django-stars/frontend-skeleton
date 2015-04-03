assert = require 'assert'

module.exports = (grunt) ->
  require('time-grunt')(grunt)
  require('jit-grunt')(grunt)

  pathsConfig = (appMainDir)->
    components: 'static/bower_components'
    # app
    appSrc: appMainDir + '/app'
    sassSrc: appMainDir + '/sass'
    imgSrc: appMainDir + '/img'
    fontsSrc: appMainDir + '/fonts'
    # static
    appDst: 'static/app'
    imgDst: 'static/img'
    cssDst: 'static/css'
    fontsDst: 'static/fonts'

  grunt.initConfig({
    paths: pathsConfig('frontend'),

    #FIXME
    watch:
      grunt:
        # FIXME ensure that
        files: ['Gruntfile.coffee']
      coffee:
        files: ['<%= paths.appSrc %>/**/*.coffee']
        tasks: ['newer:coffee']
      compass:
        files: ['<%= paths.sassSrc %>/**/*.sass','<%= paths.imgSrc %>/sprite/**']
        tasks: ['compass']
        options:
          nospawn: true
      copy:
        files: [
          '<%= paths.imgSrc %>/**'
          '<%= paths.fontsSrc %>/**'
          '<%= paths.appSrc %>/**/*.js'
        ]
        tasks: ['copy']
        options:
          nospawn: true
      jade:
        files: ['<%= paths.appSrc %>/**/*.jade',]
        tasks: ['jade']
        options:
          nospawn: true

    jade:
      frontend:
        options:
          data:
            debug: true
        expand: true
        flatten: false
        cwd: '<%= paths.appSrc %>'
        src: ['**/*.jade', ]
        dest: '<%= paths.appDst %>'
        ext: '.html'

    compass:
      development:
        options:
          #outputStyle: 'compressed'
          outputStyle: 'expanded'
          fontsDir: '<%= paths.fontsSrc %>'
          fontsPath: '<%= paths.fontsDst %>'
          httpFontsPath: '/<%= paths.fontsDst %>'
          imagesDir: '<%= paths.imgSrc %>'
          imagesPath: '<%= paths.imgSrc %>'
          generatedImagesDir: '<%= paths.imgDst %>'
          generatedImagesPath: '<%= paths.imgDst %>'
          httpGeneratedImagesPath: '/<%= paths.imgDst %>'
          specify: ['<%= paths.sassSrc %>/app.sass']
          sassDir: '<%= paths.sassSrc %>'
          cssDir: '<%= paths.cssDst %>'
    copy:
      ###
      templates:
        expand: true
        cwd: '<%= paths.tmplSrc %>'
        src: ['**']
        dest: '<%= paths.tmplDst %>'
      ###
      images:
        expand: true
        cwd: '<%= paths.imgSrc %>'
        src: ['**']
        dest: '<%= paths.imgDst %>'
      fonts:
        expand: true
        cwd: '<%= paths.fontsSrc %>'
        src: ['**']
        dest: '<%= paths.fontsDst %>'
      js:
        expand: true
        cwd: '<%= paths.appSrc %>'
        src: ['**/*.js']
        dest: '<%= paths.appDst %>'

    coffee: {
      frontend:
        options:
          bare: true
        expand: true
        flatten: false
        cwd: '<%= paths.appSrc %>'
        src: ['**/*.coffee', ]
        dest: '<%= paths.appDst %>'
        ext: '.js'
    }
    requirejs: {
      compile:
        options:
          baseUrl: '<%= paths.appDst %>'
          findNestedDependencies: true
          mainConfigFile: '<%= paths.appDst %>/main.js'
          out: "<%= paths.appDst %>/main.js"
          optimize: 'uglify2'
          name: 'main'
          uglify2:
            compress:
              drop_console: true
    }
    clean:
      js: [
        'static/js/'
        'static/fonts/'
        'static/css/'
        'static/img/'
      ]
  })

  # build app (no uglify, no combine)
  grunt.registerTask('build', ['newer:coffee', 'newer:compass', 'newer:copy', 'newer:jade'])
  # allow to force rebuild (no newer, no uglify, no combine)
  grunt.registerTask('rebuild', ['clean', 'coffee', 'compass', 'copy', 'jade'])
  grunt.registerTask('default', ['rebuild', 'watch'])
  grunt.registerTask('minify', ['rebuild', 'requirejs'])
