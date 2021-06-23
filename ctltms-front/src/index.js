
import React from 'react';
import ReactDOM from 'react-dom';
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";

import './index.css';
import main from './pages/00-Login/Login';
import home from './App';

ReactDOM.render(
    <React.StrictMode>
        <Router>
            <Switch>               
                <Route exact path="/" component={main}/>
                <Route path="/home" component={home}/>
            </Switch>
        </Router>
    </React.StrictMode>,
document.getElementById('root')
);