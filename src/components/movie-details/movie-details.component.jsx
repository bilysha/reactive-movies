import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

import './movie-details.component.css';
import image from './votes_average.gif';

import HttpClient from '../../services/httpClient';
import history from './../../history';

export default class MovieDetails extends React.Component {
    constructor(props) {
        super(props);

        this.httpClient = HttpClient;

        this.state = {
            movie: null,
            collectionParts: null,
            similarMovies: null
        };
    }

    adjustBackdropPath() {
        return `https://image.tmdb.org/t/p/original${this.state.movie.backdrop_path}`;
    }

    adjustPosterPath(src) {
        return src ?
                `https://image.tmdb.org/t/p/w200${src}`
            :
                `no_poster_image_avaliable.jpeg`
    }

    componentWillMount() {
        this.uploadMovie(this.props.match.params.movieId);
    }

    componentWillReceiveProps(nextProps, prevProps) {
        console.log('nex-props', nextProps);
        console.log('prev-props', prevProps);
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
            this.getSimilarMovies(movie)
        });
    }

    getSimilarMovies(movie) {
        this.httpClient.getSimilarMovies(movie.id)
            .then((movies) => {
                movies.results.length > 5 ?
                    this.setState({similarMovies: movies.results.splice(0, 5)})
                :
                    this.setState({similarMovies: movies.results})
            })
    }

    getCollection(movie) {
        if (movie.belongs_to_collection) {
            this.httpClient.getCollection(movie.belongs_to_collection.id)
                .then((collection) => {
                    collection.parts.length > 5 ?
                    this.setState({collectionParts: collection.parts.splice(0, 5)})
                :
                    this.setState({collectionParts: collection.parts})
                });
        }
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
                            <span className='movie-details_votes' ref={(span) => {this.votesContainer = span}}><img src={image} alt='votes_image'></img></span>
                            <h3 className='movie-details_title'>
                                <Link to={movie.homepage} className='colored-link bold'>
                                    {movie.title}
                                </Link>
                                <span className='movie-details_title_status'>{movie.status}</span>
                            </h3>
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
                            <article className='movie-details_companies'>
                                <p className='movie-details-article_title'>Companies</p>
                                <ul>
                                    {movie.production_companies.map((company, index) => 
                                        <li key={index}>
                                            {company.name}
                                        </li>
                                    )}
                                </ul>
                            </article>
                            <article className='movie-details_collection'>
                                <p className='movie-details-article_title'>Collection</p>
                                {this.state.collectionParts ?
                                    <Fragment>
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
                                    <p>No collection found for this film</p>
                                }
                            </article>
                            <article className='movie-details_similar'>
                                <p className='movie-details-article_title'>Silimar movies</p>
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
