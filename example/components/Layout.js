import React, { Component } from 'react';
import { HashRouter as Router, Redirect, Switch, Route, NavLink } from 'react-router-dom';

import Head from './Head';

const Layout = (props)=>{
    const { match }= props;
    return (
        <div className="app">
            <Head match={match}/>
            <div className="main container">
                { props.menu && (<nav className="side-nav">
                    {props.menu}
                </nav>) }
                <div className="content">
                    {props.content}
                </div>
            </div>
            <footer className="footer">
            </footer>
        </div>
);
}

export default Layout;
