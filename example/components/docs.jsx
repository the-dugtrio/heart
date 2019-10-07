import React, {Component} from 'react';
import { HashRouter as Router, Redirect, Switch, Route, NavLink, Link } from 'react-router-dom';
import connectRoute from './connectRoute';
import Layout from './Layout';
import isEmpty from "lodash/isEmpty";
import routerConfig from '../router';
import Introduce from './introduce';
const routesMap = require('../map.json');

const getMenuUl=(filter, path)=>{
    return (
        <ul>
            {filter.map(item=>{
                if(item.alias && isEmpty(item.children)){
                    return (
                        <NavLink to={`${path}/${item.name}`} activeClassName="active">
                            <li key={`${path}/${item.name}`}>
                                {item.alias}
                            </li>
                        </NavLink>
                    );
                }
                if(!item.alias && !isEmpty(item.children)){
                    return (
                        <li key={`${path}/${item.groupName}`}>
                             <div className="page-docs__group__submenu">
                                <div className="group-title">{item.groupName}</div>
                                {getMenuUl(item.children, path)}
                            </div>
                        </li>
                    );
                }
                if(!isEmpty(item.children)){
                    return (
                        <li key={`${path}/${item.alias}`}>
                            <div className="page-docs__side__submenu">
                                <div className="side-title">{item.alias}</div>
                                {getMenuUl(item.children, path)}
                            </div>
                            
                        </li>
                    )
                }
            })}
        </ul>
    )
    
} 

const Menu = (props)=>{
    const {match} = props;
    const filter = routesMap.filter(item=>item.path===match.path)[0];
    let ul = null
    if(filter.children){
        ul = getMenuUl(filter.children, match.path);
    }
    return (<div>
        {ul}
    </div>);
}

const Content = (props)=>{
    const {match} = props;
    const filter = routerConfig.filter(item=>item.path===match.path)[0];
    const redirect = filter.children.filter(item=>item.redirect)[0];
    return (
            <Switch>
                {filter.children.map(item=>{
                    if(!item.redirect){
                        return <Route key={item.path} exact path={`${match.url}/${item.path}`} exact component={item.component}></Route>
                    }else{
                        return null;
                    }
                })}
                <Redirect  to={`${match.url}/${redirect.redirect}`} />
            </Switch>
           );
}

const Common = (props)=>{
    return(<Layout {...props} menu={<Menu {...props}/>} content={<Content {...props}/>}></Layout>)
}
const CommonWrapper = connectRoute(Common);

export default class App extends Component {
    render() {
        return (
            <Router>
                <Switch>
                    <Route path="/introduce" component={Introduce} />
                    <Route path="/components" component={CommonWrapper}/>
                    <Route path="/resource" component={CommonWrapper}  />
                    <Redirect to="/introduce" />
                </Switch>
            </Router>
        );
    }
}
