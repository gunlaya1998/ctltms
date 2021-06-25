
import React from 'react';
import ReactDOM from 'react-dom';
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";

import './index.css';
import Login from './pages/00-Login/Login';
import Dashboard from './pages/01-Dashboard/Dashboard';

ReactDOM.render(
    <React.StrictMode>
        <Router>
            <Switch>               
                <Route exact path="/" component={Login} />
                <Route path="/home" component={Dashboard} />
            </Switch>
        </Router>
    </React.StrictMode>,
document.getElementById('root')
);