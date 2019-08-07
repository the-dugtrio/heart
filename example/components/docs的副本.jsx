import React from 'react';
import { HashRouter as Router, Link, NavLink, Route, Redirect, Switch } from 'react-router-dom';
import routerConfig from '../router';
import logoImg from '../assets/images/logo.png';

const routesMap = require('../map.json');

export default class App extends React.Component {
    state = {
        filterComponents: [],
        path: ''
    }

    themeStyle = '';

    initStyleReg = '';


    componentWillMount() {
        window.addEventListener(
            'hashchange',
            () => {
                window.scrollTo(0, 0);
                this.getComponents();
                this.getPage();
            },
            false,
        );
        this.getPage();
    }


    getComponents () {
        console.log(window.location.hash);
    }

    clusterDeal = color => {
        this.initColorCluster = [color, ...this.generateColors(color)];
        this.initStyleReg = this.initColorCluster
            .join('|')
            .replace(/\(/g, '\\(')
            .replace(/\)/g, '\\)')
            .replace(/0\./g, '.');
    };

    getPage() {
        // eslint-disable-next-line
        let path = location.hash.match(/(?:\/(.+))?\/(.+)/);
        if (!path) return;
        path = path[0]

        let filter = routesMap.filter(route => path.indexOf(route.path) > -1);
        if (!filter) return;
        filter = filter[0]
        this.setState({
            path: filter.path,
            filterComponents: filter.children
        })
    }

    render() {
        const { filterComponents, path } = this.state;
        return (
            <Router>
                <div className="app">
                    <header className="header">
                        <div className="docs__container">
                            <div>
                                <h1 className="docs__logo">
                                    <img src={logoImg} />
                                    <span>Heart</span>
                                </h1>
                            </div>
                            <ul className="nav">
                                <li className="nav-item">
                                    <NavLink to="/docs/guide/introduce" activeClassName="active">
                                        指南
                                    </NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink to="/components/installation" activeClassName="active">
                                        组件
                                    </NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink to="/resource/changelog" activeClassName="active">
                                        资源
                                    </NavLink>
                                </li>
                            </ul>
                        </div>
                    </header>

                    <div className="main container">
                        <nav className="side-nav">
                            <ul>{
                                    filterComponents.map((group, i) => {

                                        if (group.children) {
                                            return (
                                                <div className="group">
                                                    <div className="group-name">{group.alias}</div>
                                                    {
                                                        group.children.map((comGroup, i) => {
                                                            return <ul key={comGroup.groupName} className='com-group'>
                                                                <div className='com-group-name'>{comGroup.groupName}</div>
                                                                {
                                                                    comGroup.children.map((com) => {
                                                                        return <li key={com.name}>
                                                                            <Link 
                                                                                to={path + '/' + com.name}>
                                                                                {com.name}
                                                                            </Link>
                                                                        </li>
                                                                    })
                                                                }
                                                            </ul>
                                                        })
                                                    }
                                                </div>
                                            )
                                        } else {
                                            return <li key={group.name}>
                                                <Link 
                                                    to={path + '/' + group.name}>
                                                    {group.alias}
                                                </Link>
                                            </li>
                                        }
                                    })
                                }
                            </ul>
                        </nav>
                       
                        <div className="content">
                            {
                                routerConfig.map((item, key) => {
                                    return item.children && item.children.map((com, i) => {
                                        if (com.path) {
                                            return <Route 
                                                    key={com.path}
                                                    path={item.path + '/' + com.path}
                                                    component={com.component}>
                                                </Route>
                                        } else {
                                            return <Redirect to={item.path + '/' + com.redirect} ></Redirect>
                                        }
                                    })
                                })
                            }
                        </div>
                    </div>
                    <footer className="footer">
                    </footer>
                </div>
            </Router>
        );
    }
}
