import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
const routesMap = require('./map.json');

const aliasRoutes = [];
let routes = [];
let tempRoutes = [];
const componentMap = {
    docs: require('./components/docs.jsx').default,
    changelog: require('./components/changelog.jsx').default
};


function getComponents (components) {
    if (!components) return;
    components.forEach((component) => {
        if (component.children) return getComponents(component.children);
        if (component.index) {
            tempRoutes.push({
                path: '',
                redirect: component.name
            });
        }
        tempRoutes.push({
            path: component.name,
            component: (res) => {
                if (component.componentName) {
                    res(componentMap[component.componentName]);
                } else {
                    try {
                        res(require(`./docs/${component.name}.md`).default);
                    } catch (e) {
                        res(require(`./docs/components/${component.name}.md`).default);
                    }
                }
            }
        });
    });
}

routesMap.forEach((route) => {
    tempRoutes = [];
    getComponents(route.children);
    const _routes = {
        path: route.path,
        component: componentMap[route.componentName],
        children: tempRoutes
    };
    routes.push(_routes);
});

routes = routes.concat(aliasRoutes);
// routes.push({
//     path: '*',
//     redirect: '/components'
// });

export default routes;