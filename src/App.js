import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

import logo from './logo.svg';
import './App.css';

import MoviesList from './components/movies-list/movies-list.component';
import Genres from './components/genres/genres.component';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header>
          <img src={logo} className="App-logo" alt="logo" />
          <h1>Reactive movies</h1>
        </header>
        <main>
          <Genres />
          <Switch>
            <Route path='/' component={MoviesList} />
          </Switch>
        </main>
        <footer>
          <p>Created with react</p>
        </footer>
      </div>
    );
  }
}

export default App;
