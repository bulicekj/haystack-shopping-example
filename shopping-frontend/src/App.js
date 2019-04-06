import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import Search from './Search';
import Cars from './Cars'
import Hotels from './Hotels';
import Flights from './Flights';
import './App.css';

class App extends Component {
    render() {
        return (
            <Router>
                <div>
                    <ul className="navbar">
                        <li className="inline-list">
                            <Link to="/">Home</Link>
                        </li>
                        <li className="inline-list">
                            <Link to="/cars">Cars</Link>
                        </li>
                        <li className="inline-list">
                            <Link to="/flights">Flights</Link>
                        </li>
                        <li className="inline-list">
                            <Link to="/hotels">Hotels</Link>
                        </li>
                    </ul>
                    <img src="logo.png" className="logo"/>
                    <hr />

                    <Route exact path="/" component={Search} />
                    <Route path="/cars" component={Cars} />
                    <Route path="/hotels" component={Hotels} />
                    <Route path="/flights" component={Flights} />
                </div>
            </Router>
        );
    }
}

export default App;