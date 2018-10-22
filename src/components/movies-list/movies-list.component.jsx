import React from 'react';
import { connect } from 'react-redux';

import { fetchMoviesList, fetchMoviesListByGenreId } from './../../store/actions/movies.action';

import Movie from './../movie/movie.component';

import './movies-list.component.css';

class MoviesList extends React.Component {
    componentWillMount() {
        this.uploadMoviesList();
    }

    componentWillReceiveProps(nextProps, prevProps) {
        if (!prevProps.location && nextProps.location.pathname !== this.props.location.pathname) {
            this.uploadMoviesList(nextProps.match.params);
        }
    }

    uploadMoviesList(url) {
        const urlParams = url || this.props.match.params;
        switch(urlParams.filter) {
            case 'genre':
                return this.props.onFetchMoviesListByGenreId(urlParams.filter_id);
            case 'search':
                console.log(urlParams)
                return [];
            default:
                return this.props.onFetchMoviesList(urlParams.filter);
        }
    }

    render() {
        const movies = this.props.moviesList;

        return (
            <section className='main-content movies-list'>
                {movies.length ?
                    <ul className='main-content_movies-list'>
                        {movies.map((item, index) => <Movie key={index} movie={item}></Movie>)}
                    </ul>
                    :
                    <p>Waiting for movies</p>
                }
            </section>
        )
    }
}

export default connect(
    state => ({
        moviesList: state.moviesList
    }), //mapped state to props (state from store to props)
    dispatch => ({
        onFetchMoviesList: (filter) => {
            dispatch(fetchMoviesList(filter))
        },

        onFetchMoviesListByGenreId: (id) => {
            dispatch(fetchMoviesListByGenreId(id));
        }
    })
)(MoviesList);