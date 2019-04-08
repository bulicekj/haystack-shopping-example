import React, { Component } from 'react';
import './App.css';

// todo: Fix ES index issue, to link to traceId
class Package extends Component {
    state = {packages: [], traceId: null};

    componentDidMount() {
        fetch('/api/package')
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
                            <li className="list-item" key={option.id}>Hotel: {option.hotel}, Car: {option.car}, Flight: {option.flight}</li>
                        )}
                        {
                            this.state.traceId && <a className="ui-link" href={`http://localhost:8080/search?serviceName=shopping-frontend`}>View traces in Haystack UI</a>
                        }
                    </ul>
                </header>
            </div>
        );
    }
}

export default Package;
