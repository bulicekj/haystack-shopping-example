import React, { Component } from 'react';
import './App.css';

class Flights extends Component {
    state = {flights: [], traceId: null};

    componentDidMount() {
        fetch('/flights')
            .then(res => res.json())
                .then(res => this.setState({ flights: res.flights, traceId: res.traceId }))
            .catch(res => console.log(res));
    }

    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <h1>Flights</h1>
                    <ul>
                        {this.state.flights && this.state.flights.length > 0 && this.state.flights.map(flight =>
                            <li key={flight.id}>{flight.name}</li>
                        )}
                        {
                            this.state.traceId && <a href={`http://localhost:8080/search?traceId=${this.state.traceId}`}>View trace in Haystack UI</a>
                        }
                    </ul>
                </header>
            </div>
        );
    }
}

export default Flights;
