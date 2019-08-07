import React, {Component} from 'react';
import { HashRouter as Router, Redirect, Switch, Route, NavLink } from 'react-router-dom';
import Layout from './Layout';
const routesMap = require('../map.json');

const getMenu = (path)=>{
    return ()=>{
        return (<div>
                    <ul className="nav">
                    <li className="nav-item">
                        <NavLink to="/docs/guide/index" activeClassName="active">
                        index
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink to="/docs/guide/index1" activeClassName="active">
                        index1
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink to="/docs/guide/index2" activeClassName="active">
                        index2
                        </NavLink>
                    </li>
                </ul>
            </div>);
    }
}
const Test = ()=>{
    return(<div>1</div>)
}
const getContent = (path)=>{
    return ()=>{
        return (<div>q
                </div>)
    }
}

const TeamRoute = (props)=>{
    //获取当前的path 渲染左边菜单和右边组件
    const { component: Component, path } = props
    const renderComponent = () => {
        return <Component {...props} menu={getMenu(path)} content={getContent(path)}/>
    }
    return (<Route render={renderComponent} />);
}

export default class App extends React.Component {
    render() {
        return (
            <Router>
                <Switch>
                    {/* <TeamRoute path="/docs/guide" exact component={Layout} /> */}
                    <TeamRoute path="/components" exact component={Layout}/>
                    <TeamRoute path="/resource/" exact component={Layout}  />
                    <Route path="/docs/guide">
                    <Switch>
                        <Route path="/docs/guide/index1" exact  component={Test}>
                            111
                        </Route>
                        <Route path="/docs/guide/index2" exact  component={Test}>
                            222
                        </Route>
                        <Redirect to="/docs/guide/index2" />
                        </Switch>
                    </Route>
                    <Redirect to="/docs/guide" />
                </Switch>
            </Router>
        );
    }
}
