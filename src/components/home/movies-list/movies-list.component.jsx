import React, { Fragment } from 'react';
import { connect } from 'react-redux';

import { 
    fetchMoviesList,
    fetchMoviesListByGenreId,
    clearMoviesList,
    fetchMoviesByKey,
    fetchMoviesCollection
} from './../../../store/actions/movies.action';
import { switchActiveFilter } from './../../../store/actions/common.action';

import { userFilters } from './../../../constants/user-filters';

import Movie from './../movie/movie.component';
import Loader from './../../loader/loader.component';

import Paginator from './../../paginator/paginator.component';

import './movies-list.component.grid.css';

class MoviesList extends React.Component {
    constructor(props) {
        super(props);

        this.switchToPage = this.switchToPage.bind(this);
    }

    componentWillMount() {
        console.log('list mount')
        this.uploadMoviesList();
    }

    componentWillReceiveProps(nextProps, prevProps) {
        console.log('list recieve')
        if (!prevProps.location && nextProps.location.pathname !== this.props.location.pathname) {
            this.uploadMoviesList(nextProps.match.params);
        }
    }

    uploadMoviesList(url) {
        if (this.props.moviesList && this.props.moviesList.length) {
            this.props.onClearMoviesList();
        }

        const urlParams = url || this.props.match.params;

        this.props.onSwitchActiveFilter('Upadating ...');

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

    decodeGenre(genre_id) {
        return `${this.props.genresList.find((item) => item.id === parseInt(genre_id, 10)).name} movies`;
    }

    decodeUserFilter(filter) {
        return `${userFilters.find((item) => item.linkName === filter).name} movies`;
    }

    switchToPage(page) {
        const { params } = this.props.match;

        this.props.history.push(`/home/${params.filter}/${params.filter_id}/page/${page}`);
    }

    render() {
        const { moviesList, collection } = this.props;

        return (
            <section className='movies-list'>
                {moviesList.length ?
                    <Fragment>
                        {collection.name ?
                            <article className='collection-information'>
                                <img src={this.props.adjustBackdropPath(collection.backdrop_path)} alt='collection_poster' />
                                <p className='collection-overview'>{collection.overview}</p>
                            </article>
                        :
                            ''
                        }
                        <div className='main-content_movies-list'>
                            {moviesList.map((item, index) =>
                                <Movie
                                    key={index}
                                    adjustPosterPath={this.props.adjustPosterPath}
                                    votesStars={this.props.votesStars}
                                    setVotes={this.props.setVotes}
                                    movie={item}
                                    redirect={this.props.redirect}
                                />
                            )
                        }
                        </div>
                        {collection.name ?
                            ''
                        :
                            <Paginator activePage={this.props.activePage} pages={this.props.totalPages} switchToPage={this.switchToPage}/>
                        }
                        
                    </Fragment>
                :
                    <Loader text='Wait please... Loading movies...' />
                }
            </section>
        )
    }
}

export default connect(
    (state) => ({
        moviesList: state.moviesList.movies,
        totalPages: state.moviesList.pages,
        activePage: state.moviesList.activePage,
        genresList: state.genresList,
        collection: state.moviesList.collection
    }), //mapped state to props (state from store to props)
    dispatch => ({
        onFetchMoviesList: (filter, page) => {
            return dispatch(fetchMoviesList(filter, page))
        },

        onClearMoviesList: () => {
            dispatch(clearMoviesList());
        },

        onFetchMoviesListByGenreId: (id, page) => {
            return dispatch(fetchMoviesListByGenreId(id, page));
        },

        onFetchMoviesByKey: (key, page) => {
            return dispatch(fetchMoviesByKey(key, page));
        },

        onFetchMoviesCollection: (collection_id) => {
            return dispatch(fetchMoviesCollection(collection_id));
        },

        onSwitchActiveFilter: (filter) => {
            dispatch(switchActiveFilter(filter))
        }
    })
)(MoviesList);