import React, { Fragment } from 'react';
import { connect } from 'react-redux';

import { Link } from 'react-router-dom';

import './movie-details.component.css';
import votesImage from './votes_average.gif';
import noPhoto from './no_poster_image_available.jpeg';

import HttpClient from '../../services/httpClient';

import { switchActiveFilter } from '../../store/actions/common.action';

class MovieDetails extends React.Component {
    constructor(props) {
        super(props);

        this.httpClient = HttpClient;

        this.state = {
            movie: null,
            collection: null,
            collectionParts: null,
            similarMovies: null,
            cast: null
        };
    }

    adjustBackdropPath() {
        return `https://image.tmdb.org/t/p/original${this.state.movie.backdrop_path}`;
    }

    adjustPosterPath(src) {
        return src ?
                `https://image.tmdb.org/t/p/w200${src}`
            :
                noPhoto
    }

    componentWillMount() {
        this.uploadMovie(this.props.match.params.movieId);
    }

    componentWillReceiveProps(nextProps, prevProps) {
        if (!prevProps.location && nextProps.location.pathname) {
            console.log('here')
            this.uploadMovie(nextProps.match.params.movieId);
        }
    }

    uploadMovie(movie_id) {
        this.httpClient.getMovieById(parseInt(movie_id, 10))
        .then((movie) => {
            this.setState({movie: movie});
            return movie;
        })
        .then((movie) => {
            this.getCollection(movie);
            this.getSimilarMovies(movie);
            this.getCredits(movie);
        })
        .then(() => this.props.onSwitchActiveFilter(this.state.movie.title));
    }

    getSimilarMovies(movie) {
        this.httpClient.getSimilarMovies(movie.id)
            .then((movies) => {
                console.log(movies);
                movies.results.length > 5 ?
                    this.setState({similarMovies: movies.results.slice(0, 5)})
                :
                    this.setState({similarMovies: movies.results})
            })
    }

    getCollection(movie) {
        if (movie.belongs_to_collection) {
            this.httpClient.getCollection(movie.belongs_to_collection.id)
                .then((collection) => {
                    collection.parts.length > 5 ?
                    this.setState({collectionParts: collection.parts.slice(0, 5), collection: collection.name})
                :
                    this.setState({collectionParts: collection.parts, collection: collection.name})
                });
        }
    }

    getCredits(movie) {
        this.httpClient.getMovieCredits(movie.id)
        .then((credits) => {
            credits.cast.length > 10 ?
            this.setState({cast: credits.cast.slice(0, 10)})
        :
            this.setState({cast: credits.cast})
        });
    }

    render() {
        const movie = this.state.movie;

        if (this.votesContainer) {
            this.votesContainer.style = `background: linear-gradient(to right, #4058B1 0%, #4058B1 ${movie.vote_average * 10}%, ${movie.vote_average * 10}%, #fff 100%);`;
        }

        return (
            <section className='main-content'>
                <section className='movie-details'>
                    {movie ?
                        <Fragment>
                            <span className='movie-details_votes' ref={(span) => {this.votesContainer = span}}><img src={votesImage} alt='votes_image'></img></span>
                            <span className={`movie-details_title_status status-${movie.status}`}>{movie.status}</span>
                            <img className='movie-details_poster' src={this.adjustBackdropPath()} alt='movie_poster' />
                            <p className='movie-details_tagline'>{movie.tagline}</p>
                            <p className='movie-details_overview'>{movie.overview}</p>
                            <article className='movie-details_genres'>
                                <p className='movie-details-article_title'>Genres</p>
                                <ul>
                                    {movie.genres.map((genre, index) => 
                                        <li key={index}>
                                            <Link to={`/genre/${genre.id}/page/1`} className='dark-link'>
                                                {genre.name}
                                            </Link>
                                        </li>
                                    )}
                                </ul>
                            </article>
                            <article className='movie-details_cast'>
                                <p className="movie-details-article_title">Cast</p>
                                {this.state.cast ?
                                    <ul>
                                        {this.state.cast.map((cast, index) =>
                                            <li key={index}>
                                                <figure>
                                                    <img src={this.adjustPosterPath(cast.profile_path)} alt='cast_photo' />
                                                    <span>{cast.character}</span>
                                                    <figcaption>
                                                        {cast.name}
                                                    </figcaption>
                                                </figure>
                                            </li>
                                        )}
                                    </ul>
                                :
                                    <p className='movie-details_no-data'>We do not found any information about casts</p>
                                }
                            </article>
                            <article className='movie-details_companies'>
                                <p className='movie-details-article_title'>Companies</p>
                                {movie.production_companies.length ?
                                    <ul>
                                        {movie.production_companies.map((company, index) => 
                                            <li key={index}>
                                                {company.name}
                                            </li>
                                        )}
                                    </ul>
                                :
                                    <p className='movie-details_no-data'>We do not nothing about production companies</p>
                                }
                            </article>
                            <article className='movie-details_collection'>
                                <p className='movie-details-article_title'>Collection</p>
                                {this.state.collectionParts ?
                                    <Fragment>
                                        <p className='movie-details_no-data'>{this.state.collection}</p>
                                        <ul>
                                            {this.state.collectionParts.map((part, index) =>
                                                <li key={index}>
                                                <figure>
                                                    <img src={this.adjustPosterPath(part.poster_path)} alt='collection_part_poster'/>
                                                    <figcaption>
                                                        <Link to={`/movie/${part.id}`} className='dark-link'>
                                                            {part.title}
                                                        </Link>
                                                    </figcaption>
                                                </figure>
                                                </li>
                                            )}
                                        </ul>
                                    </Fragment>
                                :
                                    <p className='movie-details_no-data'>No collection found for this film</p>
                                }
                            </article>
                            <article className='movie-details_similar'>
                                <p className='movie-details-article_title'>Recomendations</p>
                                {this.state.similarMovies ?
                                    <ul>
                                        {this.state.similarMovies.map((movie, index) =>
                                            <li key={index} onClick={() => this.props.history.push(`/movie/${movie.id}`)}>
                                                <figure>
                                                    <img src={this.adjustPosterPath(movie.poster_path)} alt='similar_movie_poster'/>
                                                    <figcaption>
                                                        {movie.title}
                                                    </figcaption>
                                                </figure>
                                            </li>
                                        )}
                                    </ul>
                                :
                                    <p>Loading similar movies</p>
                                }
                            </article>
                        </Fragment>
                        :
                            <p>Loading movie information</p>
                    }
                </section>
            </section>
        )
    }
}

export default connect(
    state => ({}), //mapped state to props (state from store to props)
    dispatch => ({
        onSwitchActiveFilter: (filter) => {
            dispatch(switchActiveFilter(filter));
        }
    })
)(MovieDetails);
