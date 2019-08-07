import React from 'react';
import {  NavLink } from 'react-router-dom';

import logoImg from '../assets/images/logo.png';

const Head =()=>{
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
                    <li className="nav-item">
                        <NavLink to="/docs/guide" activeClassName="active">
                            指南
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink to="/components" activeClassName="active">
                            组件
                        </NavLink>
                    </li>
                    <li className="nav-item">
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
