import React from 'react';
import { HashRouter as Router, Link, NavLink, Route, Redirect } from 'react-router-dom';
import Dosc from './docs';

export default class App extends React.Component {
    render () {
        return <Router>
            <Route to="/components/installation" component={Dosc}></Route>
            <Redirect to="/components/installation"></Redirect>
        </Router>
    }
}
