import React, { Component } from 'react';
import { Switch, Route, Link, Redirect } from 'react-router-dom';

import logo from './logo.svg';
import './App.css';

import MoviesList from './components/movies-list/movies-list.component';
import Navigation from './components/navigation/navigation.component';
import MovieDetails from './components/movie-details/movie-details.component';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header>
          <Link to='/' className='header_link link'>
            <img src={logo} className="App-logo" alt="logo" />
            <h1>movies</h1>
          </Link>
        </header>
        <main className='center-content'>
          <Navigation />
          <Switch>
            <Route exact path='/' render={() => <Redirect to='/popular/-1/page/1' />} />
            <Route path='/search/:key/page/:page' component={MoviesList} />
            <Route path='/:filter/:filter_id/page/:page' component={MoviesList}/>
            <Route path='/movie/:movieId' component={MovieDetails}/>
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
