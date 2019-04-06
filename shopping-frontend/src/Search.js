import React, { Component } from 'react';
import './App.css';

class Search extends Component {
    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <h1 className="underline">Select a link above to search</h1>
                    <br />
                    <p>A trace will be created from <code>shopping-frontend</code>, which will link to the <code>shopping-backend</code> call and create a timeline in Haystack-UI</p>
                </header>
            </div>
        );
    }
}

export default Search;
