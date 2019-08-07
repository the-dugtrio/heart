import React, {Component} from 'react';
import { HashRouter as Router, Redirect, Switch, Route, NavLink, Link } from 'react-router-dom';
import Layout from './Layout';
import isEmpty from "lodash/isEmpty";
const routesMap = require('../map.json');


const getMenuUl=(filter, path)=>{
    let i=i++;
    return (
        <ul key={i}>
            {filter.map(item=>{
                if(item.alias && isEmpty(item.children)){
                    return (
                        <li key={`${path}/${item.name}`}>
                            <Link to={`${path}/${item.name}`}>
                                {item.alias}
                            </Link>
                        </li>
                    );
                }
                if(!item.alias && !isEmpty(item.children)){
                    return (
                        <li  className="page-docs__side__group" key={`${path}/${item.groupName}`}>
                            <div className="page-docs__side__submenu">{item.groupName}</div>
                            {getMenuUl(item.children, path)}
                        </li>
                    );
                }
                if(!isEmpty(item.children)){
                    return (
                        <li key={`${path}/${item.alias}`}>
                            <div className="page-docs__side__submenu">{item.alias}</div>
                            {getMenuUl(item.children, path)}
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
    console.log(filter);
    let ul = null
    if(filter.children){
        ul =    getMenuUl(filter.children, match.path);
    }
    return (<div>
        {ul}
    </div>);
}

const Test = ()=>{
    return(<div>1</div>)
}

const Content = (props)=>{
    const {match} = props;
    //console.log('Content', match)
    return (<div>
                {match.url}
                <Switch>
                    <Route path={`${match.url}/index`} exact component={Test}></Route>
                    <Route path={`${match.url}/index1`} exact component={Test}></Route>
                    <Route path={`${match.url}/index2`} exact component={Test}></Route>
                </Switch>
           </div>);
}

const Common = (props)=>{
    return(<Layout menu={<Menu {...props}/>} content={<Content {...props}/>}></Layout>)
}
export default class App extends Component {
    render() {
        return (
            <Router>
                <Switch>
                    <Route path="/docs/guide" component={Common} />
                    <Route path="/components" component={Common}/>
                    <Route path="/resource" component={Common}  />
                    <Redirect to="/docs/guide" />
                </Switch>
            </Router>
        );
    }
}
