'use strict';

var inquirer = require("inquirer"),
    fs = require('fs'),
    ui = new inquirer.ui.BottomBar();

var opt = {},
    basePath = './src/app',
    dirs = [],

    questType = {
      type: 'list',
      name: 'type',
      message: 'What kind of file you want to create?',
      choices: ['component', 'module', 'class']
    },

    questName = {
      type: 'input',
      name: 'name',
      message: 'Set name',
      validate: function (input, q) {
        if(opt.type === 'class') {return true;}
        var dirs =  fs.readdirSync(basePath + '/' + opt.type + 's'),
            out;
        for(var i = 0; i < dirs.length; i++){
          if(dirs[i] == formatDirName(input)) {
            out = 'This directory is exist! Set another name.';
          } else {
            out = true;
          }
        }
        return out;
      }
    },

    questDest = {
      type: 'list',
      name: 'dest',
      message: 'Input destination of file.',
      choices: dirs
    };

buildFsTree();

inquirer.prompt([questType], function(res){
  opt.type = res.type;
  inquirer.prompt([questName], function (res) {
    opt.name = res.name;
    if(opt.type == 'class') {
      nestedPrompt()
    } else {
      createModule(opt.type, opt.name);
    }
  });
});

function nestedPrompt(file){
  buildFsTree(file);
  if(dirs.length > 1) {
    inquirer.prompt([questDest], function (res) {
      return nestedPrompt(res.dest);
    })
  } else {
    createClass(opt.name, basePath);
  }
}

function buildFsTree(directory){
  dirs.splice(0, dirs.length);
  if(directory){
    basePath = basePath + '/' + directory
  }
  dirs.unshift('..');
  return fs.readdirSync(basePath)
    .forEach(function(file){
      if(file === 'templates' || file === 'sass') {
        return false;
      }
      if(fs.lstatSync(basePath + '/' + file).isDirectory()){
        dirs.push(file);
      }
    });
}

function formatClassName(name) {
  var formattedName = name.toLowerCase().split('.');
  if(formattedName.length > 1){
    var wordsArr = [];
    for(var i = 0, len = formattedName.length; i < len; i++){
      var fl = formattedName[i].slice(0,1);
      wordsArr.push(fl.toUpperCase() + formattedName[i].substring(1))
    }
    return wordsArr.join('');
  } else {
    // Fixme : remove this var
    var firstLetter = name.slice(0,1);
    return firstLetter.toUpperCase() + name.substring(1);
  }
}

function formatJsFileName(name) {
  var tempName = name.split('.'),
      last = tempName.length - 1;
  if(tempName[last] == 'js') {
    return name.toLowerCase();
  }
  return name.toLowerCase() + '.js';
}

function formatDirName(name) {
  var tempName = name.split('.'),
      last = tempName.length - 1;
  if(tempName[last] === 'js') {
    tempName.pop();
    tempName = tempName.join('.');
    return tempName.toLowerCase();
  }
  return name.toLowerCase();
}

function createIndexFile(type, name) {

  var indexTemp =  "'use strict';" +
    "\n\nimport angular from 'angular';" +
    "\n\nexport default angular.module('" + formatClassName(name) + "', [])" +
    "\n\t.name;";

  fs.writeFile(basePath + '/' + type + 's/' + formatDirName(name) + '/index.js', indexTemp, function(err) {
    if(err) {
      throw err;
    }
    console.log('\nHurray! ' + formatJsFileName(name) + ' has created!');
  });
}

function createModule(type, name) {
  fs.mkdir(basePath + '/' + type + 's/' + formatDirName(name), function () {
    createIndexFile(type, name);

    fs.mkdir(basePath + '/' + type + 's/' + formatDirName(name) + '/templates', function () {
      console.log('\nHurray! ' + formatDirName(name) + '\'s templates folder has created!');
      fs.writeFile(basePath + '/' + type + 's/' + formatDirName(name) + '/templates/index.jade', '', 'utf8', function () {
        console.log('\nHurray! ' + formatDirName(name) + ' index.jade has created!');
      });
    });

    fs.mkdir(basePath + '/' + type + 's/' + formatDirName(name) + '/sass', function () {
      console.log('\nHurray! ' + formatDirName(name) + '\'s sass folder has created!');
      fs.writeFile(basePath + '/' + type + 's/' + formatDirName(name) + '/sass/' + formatDirName(name) + '.sass', '', 'utf8', function () {
        console.log('\nHurray! ' + formatDirName(name) + '.sass has created!');
      });
    });
  });
}

function createClass(name, dest) {

  var controllerTemplate = ""+
    "'use strict';"+
    "\n\n@Inject()"+
    "\nexport default class "+ formatClassName(name) +" {"+
    "\n\tconstructor() {"+
    "\n\t}"+
    "\n}";

  fs.writeFile(dest + '/' + formatJsFileName(name), controllerTemplate, function(err) {
    if(err) {
      throw err;
    }
    console.log('\nHurray! ' + formatJsFileName(name) + ' has created!\n');
  });
}



