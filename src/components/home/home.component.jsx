import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import { fetchGenresList } from './../../store/actions/gerens.action';
import { fetchMoviesByKey, fetchMoviesByKeyShortlist } from './../../store/actions/movies.action';

import noPosterAvailable from './../../images/no_poster_image_available.jpeg';
import noBackdropAvailable from './../../images/no_backdrop_image_avaliable.jpg';
import votesStars from './../../images/votes_average.gif';

import Navigation from './navigation/navigation.component';
import MoviesList from './movies-list/movies-list.component';
import MovieDetails from './movie-details/movie-details.component';

import { userFilters } from './../../constants/user-filters';

class Home extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            searchResults: null
        };

        this.redirect = this.redirect.bind(this);
        this.handleSearchInputChange = this.handleSearchInputChange.bind(this);
    }

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

    transformSearchRequest(response) {
        if (response.results.length > 3) {
            this.setState({searchResults: response.results.splice(0, 3)})
        } else {
            this.setState({searchResults: response.results});
        }
    }

    handleSearchInputChange(value) {
        if (value.length > 2) {
            this.props.onFetchMoviesByKeyShortlist(value)
                .then(res => this.transformSearchRequest(res));
        } else {
            this.setState({searchResults: null});
        }
    }

    componentWillMount() {
        if (!this.props.genresList.length) {
            this.props.onFetchGenresList();
        }

        //this.uploadMoviesList();
    }

    componentWillReceiveProps(nextProps, prevProps) {
        console.log(`next props `, nextProps);
        console.log(`this props `, this.props)
        console.log(`prev props `, prevProps);
        /*if (!prevProps.location && nextProps.location.pathname !== this.props.location.pathname) {
            this.uploadMoviesList(nextProps.match.params);
        }*/
    }

    uploadMoviesList(url) {
        if (this.props.moviesList && this.props.moviesList.length) {
            this.props.onClearMoviesList();
        }

        const urlParams = url || this.props.match.params;

        switch(urlParams.filter) {
            case 'genre':
                return this.props.onFetchMoviesListByGenreId(urlParams.filter_id, urlParams.page)
                    .then(() => this.props.onSwitchActiveFilter(this.decodeGenre(urlParams.filter_id)));
            case 'search':
                return this.props.onFetchMoviesByKey(urlParams.filter_id, urlParams.page)
                    .then(() => this.props.onSwitchActiveFilter(`'${urlParams.filter_id}' search results`));
            case 'collection':
                return this.props.onFetchMoviesCollection(urlParams.filter_id)
                    .then(() => this.props.onSwitchActiveFilter(`${this.props.collection.name} collection`));
            default:
                return this.props.onFetchMoviesList(urlParams.filter, urlParams.page)
                    .then(() => this.props.onSwitchActiveFilter(this.decodeUserFilter(urlParams.filter)));
        }
    }

    redirect(url) {
        this.props.history.push(url);
    }

    render() {
        return (
            <section>
                <Navigation
                    genresList={this.props.genresList}
                    activeFilter={this.props.activeFilter}
                    userFilters={userFilters}
                    searchResults={this.state.searchResults}
                    adjustPosterPath={this.adjustPosterPath}
                    redirect={this.redirect}
                    handleSearchInputChange={this.handleSearchInputChange}
                />
                <Switch>
                    <Route
                        exact path={`/home`}
                        render={() => <Redirect to={`/home/popular/-1/page/1`} />}
                    />
                    <Route
                        path={`/home/:filter/:filter_id/page/:page`}
                        render={(props) => (
                            <MoviesList
                                {...props}
                                adjustPosterPath={this.adjustPosterPath}
                                adjustBackdropPath={this.adjustBackdropPath}
                                votesStars={votesStars}
                                setVotes={this.setVotes}
                            />
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

export default connect(
    state => ({
        genresList: state.genresList,
        activeFilter: state.common
    }), //mapped state to props (state from store to props)
    dispatch => ({
        onFetchGenresList: () => {
            dispatch(fetchGenresList())
        },

        onFetchMoviesByKey: (key) => {
            dispatch(fetchMoviesByKey(key));
        },

        onFetchMoviesByKeyShortlist: (key) => {
            return dispatch(fetchMoviesByKeyShortlist(key));
        }
    })
)(Home);
