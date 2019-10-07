import React from 'react';
import {  NavLink } from 'react-router-dom';
import classNames from "classnames";

import logoImg from '../assets/images/logo.gif';
import '../assets/styles/head.css';

const Head =(props)=>{
    const {match:{path}} = props;
    return(
        <header className="header">
            <div className="docs__container">
                <div>
                    <h1 className="docs__logo">
                        <img src={logoImg} />
                        <span>Heart</span>
                    </h1>
                </div>
                <ul className="nav">
                    <li className={classNames("nav-item", {"active":path==='/docs'})}>
                        <NavLink to="/docs" activeClassName="active">
                            指南
                        </NavLink>
                    </li>
                    <li className={classNames("nav-item", {"active":path==='/components'})}>
                        <NavLink to="/components" activeClassName="active">
                            组件
                        </NavLink>
                    </li>
                    <li className={classNames("nav-item", {"active":path==='/resource'})}>
                        <NavLink to="/resource" activeClassName="active">
                            资源
                        </NavLink>
                    </li>
                </ul>
            </div>
        </header>
    );
}

export default Head;
