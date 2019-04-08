import React, { Component } from 'react';
import './App.css';

class Cars extends Component {
    state = {cars: [], traceId: null};

    componentDidMount() {
        fetch('/cars')
            .then(res => res.json())
                .then(res => this.setState({ cars: res.cars, traceId: res.traceId }))
            .catch(res => console.log(res));
    }

    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <h1>Cars:</h1>
                    <ul>
                        {this.state.cars && this.state.cars.length > 0 && this.state.cars.map(car =>
                            <li key={car.id}>{car.name}</li>
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

export default Cars;
