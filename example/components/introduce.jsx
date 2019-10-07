import React from "react";
import { HashRouter as Router, Redirect, Switch, Route, NavLink, Link } from 'react-router-dom';
import Head from './Head';
import '../assets/styles/introduce.css';

export default class Introduce extends React.Component {
    render() {
        return (
            <div className="app">
                <Head match={{path: '/docs'}}/>
                <div className="introduce-wrap">
                    <h2> Heart</h2>
                    <h3>用心存放</h3>

                    <p>保留你的组件，将代码一生复用</p>
                    <p>keep your component, use it anytime</p>

                    <Link to="/components/badge"><button type="button" >Start</button></Link>
                    <a href="https://github.com/the-dugtrio/heart"><button type="button" >Github</button></a>
                </div>
            </div>
        )
    }
}