
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
import Account from './pages/02-Accounts/Accounts';
import Vehicles from './pages/03-Vehicles/Vehicles';
import Staff from './pages/04-Staff/Staff';
import Booking from './pages/05-Booking/Booking';
import Order from './pages/06-Order/Order';
import Report from './pages/07-Report/Report';
import Service from './pages/08-Service/Service'

ReactDOM.render(
    <React.StrictMode>
        <Router>
            <Switch>               
                <Route exact path="/" component={Login} />
                <Route path="/home" component={Dashboard} />
                <Route path="/account" component={Account} />
                <Route path="/vehicles" component={Vehicles} />
                <Route path="/staff" component={Staff} />
                <Route path="/booking" component={Booking} />
                <Route path="/order" component={Order} />
                <Route path="/report" component={Report} />
                <Route path="/service" component={Service} />
            </Switch>
        </Router>
    </React.StrictMode>,
document.getElementById('root')
);