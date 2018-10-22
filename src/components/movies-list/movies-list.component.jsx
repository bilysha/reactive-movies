import React from 'react';
import { connect } from 'react-redux';

import { fetchMoviesList, fetchMoviesListByGenreId } from './../../store/actions/movies.action';

import Movie from './../movie/movie.component';

import './movies-list.component.css';

class MoviesList extends React.Component {
    componentWillMount() {
        this.uploadMoviesList();
    }

    uploadMoviesList() {
        const urlParams = this.props.match.params;
        console.log(urlParams);
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
        //const genres = this.props.state.genresList;

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