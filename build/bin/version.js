var fs = require('fs');
var path = require('path');
var version = process.env.VERSION || require('../../package.json').version;

var content = {
    '3.6.3': '3.6.3',
    '2.18.0': '2.18.0'
};
if (!content[version]) content[version] = version;
fs.writeFileSync(path.resolve(__dirname, '../../example/versions.json'), JSON.stringify(content));
