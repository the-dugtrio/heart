/* eslint-disable no-console */

console.log();
process.on('exit', () => {
    console.log();
});

if (!process.argv[2]) {
    console.error('[组件名]必填 - Please enter new component name');
    process.exit(1);
}

var path = require('path');
var fileSave = require('file-save');
var uppercamelcase = require('uppercamelcase');
var navConfigFile = require('../../example/map.json');

var componentname = process.argv[2];
var chineseName = process.argv[3] || componentname;
var ComponentName = uppercamelcase(componentname);
var PackagePath = path.resolve(__dirname, '../../src/components', componentname);
var Files = [
    {
        filename: 'index.js',
        content: `import ${ComponentName} from './${componentname}';
export default ${ComponentName};`
    },
    {
        filename: `${componentname}.jsx`,
        content: `import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
export default class ${ComponentName} extends React.Component {
}
`
    },
    {
        filename: path.join('../../../example/docs/components', `${componentname}.md`),
        content: `## ${ComponentName} ${chineseName}

### 概述


### 代码演示

::: demo ${componentname}
基础用法
:::

### API

#### ${ComponentName}
| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| — | — | — | — | — |

#### ${ComponentName} Events
| 事件名      | 说明          | 返回值                           |
|---------- |-------------- |--------------------------------  |
| — | — | — |

### 贡献者
| 类型       | 参与者                          |
|---------- |--------------------------------  |
| 维护者 | — |
| 设计师 | — |
`
    }
];

// 创建 package
Files.forEach((file) => {
    fileSave(path.join(PackagePath, file.filename))
        .write(file.content, 'utf8')
        .end('\n');
});

// 添加到 map.json
navConfigFile.forEach((nav) => {
    if (nav.path.indexOf('components') > -1) {
        var groups = nav.children[nav.children.length - 1].children;
        var otherGroup = groups[groups.length - 1];
        otherGroup.children.push({
            name: componentname,
            alias: chineseName
        });
    }
});

fileSave(path.join(__dirname, '../../example/map.json'))
    .write(JSON.stringify(navConfigFile, null, 4), 'utf8')
    .end('\n');

console.log('DONE!');
