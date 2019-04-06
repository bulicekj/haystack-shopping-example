import React, { Component } from 'react';
import './App.css';

class Flights extends Component {
    state = {flights: []};

    componentDidMount() {
        fetch('/flights')
            .then(res => res.json())
                .then(flights => this.setState({ flights }))
            .catch(res => console.log(res));
    }

    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <h1>Flights</h1>
                    <ul>
                        {this.state.flights.map(flight =>
                            <li key={flight.id}>{flight.name}</li>
                        )}
                    </ul>
                </header>
            </div>
        );
    }
}

export default Flights;
