import React from 'react';
import { HashRouter as Router, Link, NavLink, Route } from 'react-router-dom';
import routerConfig from '../router';

const routesMap = require('../map.json');

export default class App extends React.Component {
    constructor(props) {
        super(props);
    }

    themeStyle = '';

    initStyleReg = '';


    componentWillMount() {
        console.log(this.getPage(), 1);
        window.addEventListener(
            'hashchange',
            () => {
                window.scrollTo(0, 0);
                this.getComponents();
                this.setPage();
            },
            false,
        );
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

    getSide

    getPage() {
        // eslint-disable-next-line
        const routes = location.hash.match(/(?:\/(.+))?\/(.+)/);

        return routesMap.filter(route => routes.indexOf(route.path) > -1)[0];
    }

    setPage(fn) {
        this.setState({ page: this.getPage() }, fn);
    }

    render() {
        return (
            <Router>
                <div className="app">
                    <header className="header">
                        <h1>
                            {/* <img src={require('./assets/logo.png')} /> */}
                            <span>Heart</span>
                        </h1>
                        <ul className="nav">
                            <li className="nav-item">
                                <NavLink to="/docs/guide" activeClassName="active">
                                    指南
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to="/components" activeClassName="active">
                                    组件
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to="/resource" activeClassName="active">
                                    资源
                                </NavLink>
                            </li>
                        </ul>
                    </header>

                    <div className="main container">
                        <nav className="side-nav">
                            <ul>{
                                routerConfig.map((item, key) => {
                                    return (item.children && item.children.map((com, i) => {
                                        return <li key={com.path}>
                                                <Link 
                                                    to={item.path + '/' + com.path}>
                                                    {com.path}
                                                </Link>
                                            </li>
                                    }))
                                })
                            }</ul>
                        </nav>
                       
                        <div className="content">
                            {
                                routerConfig.map((item, key) => {
                                    return item.children && item.children.map((com, i) => {
                                        return (
                                            <Route 
                                                key={com.path}
                                                path={item.path + '/' + com.path}
                                                component={com.component}>
                                            </Route>
                                        )
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