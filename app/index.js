'use strict';
var yeoman = require('yeoman-generator');
var yosay = require('yosay');


module.exports = yeoman.Base.extend({
    prompting: function() {
      this.log(yosay());

      var prompts = [{
        type: 'input',
        name: 'appName',
        message: 'What is your app\'s name ?',
        default: this.appname
      }]

      return this.prompt(prompts)
        .then(function(props) {
          this.appName = props.appName;
        }.bind(this));
    },

    writing: function() {
      this.template('_README.md', 'README.md')
      this.template('_package.json', 'package.json')

      this.fs.copy(
        this.templatePath('common/**'),
        this.destinationPath()
      )

      var dirNamesToCopy = ['src', 'gulp', 'tests-e2e'];
      dirNamesToCopy.forEach(function(dirName) {
        this.fs.copy(
          this.templatePath(dirName),
          this.destinationPath(dirName)
        )
      }, this);
    },

    install: function() {
      this.installDependencies({
        npm: true,
        bower: false,
        callback: function () {
          console.log('Everything is ready! Run gulp!');
        }
      })
    },
});
