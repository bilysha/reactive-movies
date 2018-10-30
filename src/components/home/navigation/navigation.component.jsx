import React, { Fragment } from 'react';

import './navigation.component.css';

import Loader from './../../loader/loader.component';

class Navigation extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            collapsed: false
        };
    }

    render() {
        const {
            genresList,
            redirect,
            userFilters,
            searchResults,
            handleSearchInputChange,
            activeFilter,
            adjustPosterPath
        } = this.props;

        return (
            <section className={`side-menu navigation collapsed-${this.state.collapsed} ${genresList.length ? '' : 'loading'}`}>
                {genresList.length ?
                    <Fragment>
                        <article className='navigation_short-info'>
                            <p className='navigation-active-filter'>{ activeFilter }</p>
                            <form className='navigation_search' onSubmit={(e) => e.preventDefault()}>
                                <input
                                    type="text"
                                    name="name"
                                    ref={(input) => this.searchIput = input}
                                    onChange={() => handleSearchInputChange(this.searchIput.value)}
                                    className={`${this.searchIput ? this.searchIput.value.length > 3 ? 'enable' : 'disabled' : 'disabled'}`}
                                />
                                <button
                                    onClick={() => redirect(`/home/search/${this.searchIput ? this.searchIput.value : ''}/page/1`)}
                                    className={`navigation_search_btn ${this.searchIput ? this.searchIput.value.length > 3 ? 'enable' : 'disabled' : 'disabled'}`}
                                > Search </button>
                            </form>
                            <span className='navigation_short-info_collapse_btn' onClick={() => this.setState({collapsed: !this.state.collapsed})}>
                                <i className="fa fa-chevron-down"></i>
                            </span>
                        </article>
                        <div className='navigation_main-content'>
                            <article className='navigation-genres-list'>
                                <ul>
                                    {genresList.map((genre, index) => 
                                        <li key={index} onClick={() => redirect(`/home/genre/${genre.id}/page/1`)}>
                                            {genre.name}
                                        </li>
                                    )}
                                </ul>
                            </article>
                            <article className='navigation-filters-list'>
                                <ul>
                                    {userFilters.map((filter, index) => 
                                        <li key={index} onClick={() => redirect(`/home/${filter.linkName}/-1/page/1`)}>
                                            {filter.name}
                                        </li>
                                    )}
                                </ul>
                            </article>
                            <article className='navigation-search-results'>
                                {searchResults ?
                                    <ul>
                                        {searchResults.map((movie, index) => 
                                            <li key={index} onClick={() => redirect(`/home/movie/${movie.id}`)}>
                                                <figure>
                                                    <img src={adjustPosterPath(movie.poster_path)} alt='movie_poster' />
                                                    <figcaption>
                                                        {movie.title}
                                                    </figcaption>
                                                </figure>
                                            </li>
                                        )}
                                    </ul>
                                :
                                    ''
                            }
                            </article>
                        </div>
                    </Fragment>
                :
                    <Loader text='Wait please... Loading genres information...' />
                }
            </section>
        )
    }
}

export default Navigation;