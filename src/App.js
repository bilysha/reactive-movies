import React, { Component } from 'react';
import { Switch, Route, Link, Redirect } from 'react-router-dom';

import logo from './logo.svg';
import noPosterAvailable from './images/no_poster_image_available.jpeg';
import noBackdropAvailable from './images/no_backdrop_image_avaliable.jpg';
import votesStars from './images/votes_average.gif';
import './styles/App.css';

import MoviesList from './components/movies-list/movies-list.component';
import Navigation from './components/navigation/navigation.component';
import MovieDetails from './components/movie-details/movie-details.component';

class App extends Component {
  adjustPosterPath(url) {
    return url ?
      `https://image.tmdb.org/t/p/w500${url}`
    :
      noPosterAvailable;
  }

  adjustBackdropPath(url) {
    return url ?
        `https://image.tmdb.org/t/p/original${url}`
    :
        noBackdropAvailable;
  }

  setVotes(container, votes) {
    if (container) {
      container.style = `background: linear-gradient(to right, orangered 0%, orangered ${votes * 10}%, ${votes * 10}%, #fff 100%);`;
    }
  }

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
          <Navigation adjustPosterPath={this.adjustPosterPath} />
          <Switch>
            <Route 
              exact path={`/`}
              render={() => <Redirect to={`/popular/-1/page/1`} />}
            />
            <Route
              path={`/:filter/:filter_id/page/:page`}
              render={(props) => (
                <MoviesList {...props} adjustPosterPath={this.adjustPosterPath} votesStars={votesStars} setVotes={this.setVotes}/>
              )}
            />
            <Route
              path={`/movie/:movieId`}
              render={(props) => (
                <MovieDetails {...props} adjustPosterPath={this.adjustPosterPath} adjustBackdropPath={this.adjustBackdropPath} votesStars={votesStars} />
              )}
            />
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
