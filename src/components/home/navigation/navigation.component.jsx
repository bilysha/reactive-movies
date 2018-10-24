import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import './navigation.component.css';
import { fetchGenresList } from '../../../store/actions/gerens.action';
import { fetchMoviesByKey } from './../../../store/actions/movies.action';

import HttpClient from '../../../services/movies.httpClient';

import { userFilters } from './../../../constants/user-filters';

import Loader from './../../loader/loader.component';

class Navigation extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            collapsed: false,
            searchResults: null
        };

        this.handleSearchInputChange = this.handleSearchInputChange.bind(this);
    }

    componentWillMount() {
        this.props.onFetchGenresList();
    }

    transformSearchRequest(response) {
        if (response.results.length > 3) {
            this.setState({searchResults: response.results.splice(0, 3)})
        } else {
            this.setState({searchResults: response.results});
        }
    }

    handleSearchInputChange() {
        if (this.searchIput.value.length > 2) {
            HttpClient.findMovies(this.searchIput.value)
                .then(res => this.transformSearchRequest(res));
        } else {
            this.setState({searchResults: null});
        }
    }

    render() {
        const genres = this.props.genresList;

        return (
            <section className={`side-menu navigation collapsed-${this.state.collapsed} ${genres.length ? '' : 'loading'}`}>
                {genres.length ?
                    <Fragment>
                        <article className='navigation_short-info'>
                            <p className='navigation-active-filter'>{ this.props.activeFilter }</p>
                            <form className='navigation_search' onSubmit={(e) => e.preventDefault()}>
                                <input
                                    type="text"
                                    name="name"
                                    ref={(input) => this.searchIput = input}
                                    onChange={this.handleSearchInputChange}
                                    className={`${this.searchIput ? this.searchIput.value.length > 3 ? 'enable' : 'disabled' : 'disabled'}`}
                                />
                                <Link
                                    to={`/home/search/${this.searchIput ? this.searchIput.value : ''}/page/1`}
                                    className={`link navigation_search_btn ${this.searchIput ? this.searchIput.value.length > 3 ? 'enable' : 'disabled' : 'disabled'}`}>
                                        Search
                                </Link>
                            </form>
                            <span className='navigation_short-info_collapse_btn' onClick={() => this.setState({collapsed: !this.state.collapsed})}>
                                <i className="fa fa-chevron-down"></i>
                            </span>
                        </article>
                        <div className='navigation_main-content'>
                            <article className='navigation-genres-list'>
                                <ul>
                                    {genres.map((genre, index) => 
                                        <li key={index}>
                                            <Link to={`/home/genre/${genre.id}/page/1`} className='dark-link'>
                                                {genre.name}
                                            </Link>
                                        </li>
                                    )}
                                </ul>
                            </article>
                            <article className='navigation-filters-list'>
                                <ul>
                                    {userFilters.map((filter, index) => 
                                        <li key={index}>
                                            <Link to={`/home/${filter.linkName}/-1/page/1`} className='dark-link'>
                                                {filter.name}
                                            </Link>
                                        </li>
                                    )}
                                </ul>
                            </article>
                            <article className='navigation-search-results'>
                                {this.state.searchResults ?
                                    <ul>
                                        {this.state.searchResults.map((movie, index) => 
                                            <li key={index}>
                                                <figure>
                                                    <img src={this.props.adjustPosterPath(movie.poster_path)} alt='movie_poster' />
                                                    <figcaption>
                                                        <Link to={`/home/movie/${movie.id}`} className='dark-link'>
                                                            {movie.title}
                                                        </Link>
                                                    </figcaption>
                                                </figure>
                                            </li>
                                        )}
                                    </ul>
                                :
                                    <p></p>
                            }
                            </article>
                        </div>
                    </Fragment>
                :
                    <Loader text='Wait please... Loading information...' />
                }
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
        }
    })
)(Navigation);