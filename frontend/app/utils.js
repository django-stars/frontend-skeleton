exports.templatePath = templatePath;

function templatePath(moduleName, templatePath) {
  return `/static/templates/app/${moduleName}/${templatePath}`;
}
