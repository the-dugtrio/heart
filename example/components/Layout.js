import React, { Component } from 'react';
import { HashRouter as Router, Redirect, Switch, Route, NavLink } from 'react-router-dom';

import Head from './Head';

const Layout = (prop)=>{
    return (
        <div className="app">
            <Head/>
            <div className="main container">
                <nav className="side-nav">
                    {prop.menu}
                </nav>
                <div className="content">
                    {prop.content}
                </div>
            </div>
            <footer className="footer">
            </footer>
        </div>
);
}

export default Layout;
