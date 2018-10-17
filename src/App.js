import React, { Component } from 'react';
import { Switch, Route, Link } from 'react-router-dom';

import logo from './logo.svg';
import './App.css';

import MoviesList from './components/movies-list/movies-list.component';
import Genres from './components/genres/genres.component';
import MovieDetails from './components/movie-details/movie-details.component';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header>
          <Link to='/' className='header_link link'>
            <img src={logo} className="App-logo" alt="logo" />
            <h1>Reactive movies</h1>
          </Link>
        </header>
        <main>
          <Genres />
          <Switch>
            <Route exact path='/' component={MoviesList} />
            <Route path='/movie/:movieId' component={MovieDetails} />
          </Switch>
        </main>
        <footer>
          <p>Copyrate © Ilya Belavusau</p>
        </footer>
      </div>
    );
  }
}

export default App;
