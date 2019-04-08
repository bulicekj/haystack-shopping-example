import React, { Component } from 'react';
import './App.css';

class Package extends Component {
    state = {packages: [], traceId: null};

    componentDidMount() {
        fetch('/package')
            .then(res => res.json())
                .then(res => this.setState({ packages: res.packages, traceId: res.traceId }))
            .catch(res => console.log(res));
    }

    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <h1>Package</h1>
                    <ul>
                        {this.state.packages && this.state.packages.length > 0 && this.state.packages.map(option =>
                            <li key={option.id}>Hotel: {option.hotel}, Car: {option.car}, Flight: {option.flight}</li>
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

export default Package;
