/* eslint-disable no-console */

var fs = require('fs');
var path = require('path');
var Components = require('../../components.json').base;

Components = Object.keys(Components);
var basepath = path.resolve(__dirname, '../../src/styles/');

function fileExists(filePath) {
    try {
        return fs.statSync(filePath).isFile();
    } catch (err) {
        return false;
    }
}

var indexContent = '@import "./base.css";\n@import "./reset.css";\n';
Components.forEach(function (key) {
    if (['icon'].indexOf(key) > -1) { return; }
    var fileName = `${key}.css`;
    indexContent += `@import "./${fileName}";\n`;
    var filePath = path.resolve(basepath, fileName);
    if (!fileExists(filePath)) {
        fs.writeFileSync(filePath, `/* ${fileName} */`, 'utf8');
        console.log(' 创建遗漏的 ', fileName, ' 文件');
    }
});
fs.writeFileSync(path.resolve(basepath, 'index.css'), indexContent);
