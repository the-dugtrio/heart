import React, {Component} from 'react';
import { HashRouter as Router, Redirect, Switch, Route, NavLink, Link } from 'react-router-dom';
import connectRoute from './connectRoute';
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
    console.log(match);
    const filter = routesMap.filter(item=>item.path===match.path)[0];
    let ul = null
    if(filter.children){
        ul =    getMenuUl(filter.children, match.path);
        //console.log('ul', ul);
    }
    return (<div>
        {ul}
    </div>);
}

const Test1 = ()=>{
    return(<div>1</div>)
}

const Test2 = ()=>{
    return(<div>2</div>)
}
const Content = (props)=>{
    const {match} = props;
    //console.log('Content', match)
    return (<div>
                {match.url}
                <Switch>
                    <Route path={`${match.url}/badge`} exact component={Test1}></Route>
                    <Route path={`${match.url}/installation`} exact component={Test2}></Route>
                </Switch>
           </div>);
}

const Common = (props)=>{
    console.log('props', props);
    return(<Layout menu={<Menu {...props}/>} content={<Content {...props}/>}></Layout>)
}
const CommonWrapper = connectRoute(Common);

export default class App extends Component {
    render() {
        return (
            <Router>
                <Switch>
                    <Route path="/docs/guide" component={CommonWrapper} />
                    <Route path="/components" component={CommonWrapper}/>
                    <Route path="/resource" component={CommonWrapper}  />
                    <Redirect to="/docs/guide" />
                </Switch>
            </Router>
        );
    }
}
