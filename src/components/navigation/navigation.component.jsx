import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import './navigation.component.css';
import { fetchGenresList } from '../../store/actions/gerens.action';
import { fetchMoviesByKey } from './../../store/actions/movies.action';

import HttpClient from '../../services/httpClient';

import { userFilters } from './../../constants/user-filters';

class Navigation extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            collapsed: false,
            searchResults: null
        };

        this.handleSearchInputChange = this.handleSearchInputChange.bind(this);
        this.onSubmitSearchForm = this.onSubmitSearchForm.bind(this);
    }

    adjustPosterPath(path) {
        return `https://image.tmdb.org/t/p/w200${path}`;
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

    onSubmitSearchForm(e) {
        e.preventDefault();
        if (this.searchIput.value.length > 2) {
            //this.props.onFetchMoviesByKey(this.searchIput.value.length);
        }
    }

    render() {
        const genres = this.props.genresList;

        return (
            <section className={`side-menu navigation collapsed-${this.state.collapsed}`}>
                {genres.length > 0 ?
                    <Fragment>
                        <article className='navigation_short-info'>
                            <p>Active filter</p>
                            <form className='navigation_search' onSubmit={(e) => this.onSubmitSearchForm(e)}>
                                <input type="text" name="name" ref={(input) => this.searchIput = input} onChange={this.handleSearchInputChange}/>
                                <input type="submit" value="Search" onClick={this.onSubmitSearchForm}/>
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
                                            <Link to={`/genre/${genre.id}/page/1`} className='dark-link'>
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
                                            <Link to={`/${filter.linkName}/-1/page/1`} className='dark-link'>
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
                                                    <img src={this.adjustPosterPath(movie.poster_path)} alt='movie_poster' />
                                                    <figcaption>
                                                        <Link to={`/movie/${movie.id}`} className='dark-link'>
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
                    <p>Waiting for genres</p>
                }
            </section>
        )
    }
}

export default connect(
    state => ({
        genresList: state.genresList
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