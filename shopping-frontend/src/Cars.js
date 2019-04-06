import React, { Component } from 'react';
import './App.css';

class Cars extends Component {
    state = {cars: []};

    componentDidMount() {
        fetch('/cars')
            .then(res => res.json())
                .then(cars => this.setState({ cars }))
            .catch(res => console.log(res));
    }

    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <h1>Cars:</h1>
                    <ul>
                        {this.state.cars.map(car =>
                            <li key={car.id}>{car.name}</li>
                        )}
                    </ul>
                </header>
            </div>
        );
    }
}

export default Cars;
