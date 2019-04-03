import React, { Component } from 'react';
import opentracing from 'opentracing';
import './App.css';
import tracer from './tracer';

class Cars extends Component {
    state = {cars: []};

    componentDidMount() {
        const span = tracer
            .startSpan('get-those-cars', {tags: {'span.kind': 'client'}})
            .setTag(opentracing.Tags.HTTP_METHOD, 'GET');

        console.log(span);
        fetch('/cars', {
            method: 'GET',
            body: JSON.stringify({

            })
        })
            .then(res => {
                span.finish();
                return res.json();
            })
            .then(cars => this.setState({ cars }));
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
