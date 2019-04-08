import React, { Component } from 'react';
import './App.css';

class Hotels extends Component {
    state = {hotels: [], traceId: null};

    componentDidMount() {
        fetch('/hotels')
            .then(res => res.json())
                .then(res => this.setState({ hotels: res.hotels, traceId: res.traceId }))
            .catch(res => console.log(res));
    }

    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <h1>Hotels</h1>
                    <ul>
                        {this.state.hotels && this.state.hotels.length > 0 && this.state.hotels.map(hotel =>
                            <li key={hotel.id}>{hotel.name}</li>
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

export default Hotels;
