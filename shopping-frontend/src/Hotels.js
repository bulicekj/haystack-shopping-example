import React, { Component } from 'react';
import './App.css';

class Hotels extends Component {
    state = {hotels: []};

    componentDidMount() {
        fetch('/hotels')
            .then(res => res.json())
                .then(hotels => this.setState({ hotels }))
            .catch(res => console.log(res));
    }

    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <h1>Hotels</h1>
                    <ul>
                        {this.state.hotels.map(hotel =>
                            <li key={hotel.id}>{hotel.name}</li>
                        )}
                    </ul>
                </header>
            </div>
        );
    }
}

export default Hotels;
