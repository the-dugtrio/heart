import React, {Component} from 'react';
import { HashRouter as Router, Redirect, Switch, Route, NavLink } from 'react-router-dom';
import Layout from './Layout';
const routesMap = require('../map.json');

const Menu = (path)=>{
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

const Test = ()=>{
    return(<div>1</div>)
}

const Content = (props)=>{
    const {match} = props;
    return (<div>
                {match.url}
                <Route path={`${match.url}/index`} exact component={Test}></Route>
                <Route path={`${match.url}/index1`} exact component={Test}></Route>
                <Route path={`${match.url}/index2`} exact component={Test}></Route>
           </div>);
}

export default class App extends Component {
    render() {
        return (
            <Router>
                <Switch>
                    <Route path="/docs/guide" exact component={(props)=>{
                        return(<Layout menu={<Menu {...props}/>} content={<Content {...props}/>}></Layout>)
                    }} />
                    <Route path="/components" exact component={(props)=>{
                        return(<Layout menu={<Menu {...props}/>} content={<Content {...props}/>}></Layout>)
                    }}/>
                    <Route path="/resource" exact component={(props)=>{
                        return(<Layout menu={<Menu {...props}/>} content={<Content {...props}/>}></Layout>)
                    }}  />
                    <Redirect to="/docs/guide" />
                </Switch>
            </Router>
        );
    }
}
