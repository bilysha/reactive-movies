import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import noPosterAvailable from './../../images/no_poster_image_available.jpeg';
import noBackdropAvailable from './../../images/no_backdrop_image_avaliable.jpg';
import votesStars from './../../images/votes_average.gif';

import Navigation from './navigation/navigation.component';
import MoviesList from './movies-list/movies-list.component';
import MovieDetails from './movie-details/movie-details.component';

class Home extends React.Component {
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
            <section>
                <Navigation adjustPosterPath={this.adjustPosterPath} />
                <Switch>
                    <Route
                        exact path={`/home`}
                        render={() => <Redirect to={`/home/popular/-1/page/1`} />}
                    />
                    <Route
                        path={`/home/:filter/:filter_id/page/:page`}
                        render={(props) => (
                            <MoviesList {...props} adjustPosterPath={this.adjustPosterPath} adjustBackdropPath={this.adjustBackdropPath} votesStars={votesStars} setVotes={this.setVotes}/>
                        )}
                    />
                    <Route
                        path={`/home/movie/:movieId`}
                        render={(props) => (
                            <MovieDetails {...props} adjustPosterPath={this.adjustPosterPath} adjustBackdropPath={this.adjustBackdropPath} votesStars={votesStars} />
                        )}
                    />
                </Switch>
            </section>
        )
    }
}

export default Home;
