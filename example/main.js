import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter } from 'react-router-dom';
import 'main/styles/index.css';
import 'example/assets/styles/common.css';
import 'example/assets/styles/app.css';
import 'markdown-it-react-loader/index.css';
import App from './components/app';


ReactDOM.render( <App />, document.getElementById('root') );