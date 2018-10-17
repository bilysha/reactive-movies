import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

import './movie-details.component.css';

import HttpClient from '../../services/httpClient';

export default class MovieDetails extends React.Component {
    constructor(props) {
        super(props);

        this.httpClient = new HttpClient();

        this.state = {
            movie: null,
            collection: null,
            similarMovies: null
        };
    }

    adjustPosterPath() {
        return `https://image.tmdb.org/t/p/original${this.state.movie.backdrop_path}`;
    }

    componentWillMount() {
        this.httpClient.getMovieById(parseInt(this.props.match.params.movieId, 10))
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
            .then(() => console.log(this.state.similarMovies));
    }

    getCollection(movie) {
        if (movie.belongs_to_collection) {
            this.httpClient.getCollection(movie.belongs_to_collection.id)
                .then(collection => this.setState({collection: collection}));
        }
    }

    render() {
        const movie = this.state.movie;

        return (
            <section className='main-content'>
                <section className='movie-details'>
                    {movie ?
                        <Fragment>
                            <h3 className='movie-details_title'>
                                <Link to={movie.homepage} className='link'>
                                    {movie.title}
                                </Link>
                                <span className='movie-details_title_votes'>{movie.vote_average}</span>
                            </h3>
                            <img className='movie-details_poster' src={this.adjustPosterPath()} alt='movie_poster' />
                            <p className='movie-details_tagline'>{movie.tagline}</p>
                            <p className='movie-details_overview'>{movie.overview}</p>
                            <p className='movie-details_status'>{movie.status}</p>
                            <article className='movie-details_genres'>
                                <p>Genres : </p>
                                <ul>
                                    {movie.genres.map((genre, index) => <li key={index}>{genre.name}</li>)}
                                </ul>
                            </article>
                            <article className='movie-details_companies'>
                                <p>Companies : </p>
                                <ul>
                                    {movie.production_companies.map((company, index) => <li key={index}>{company.name}</li>)}
                                </ul>
                            </article>
                            <article className='movie-details_collection'>
                                {this.state.collection ?
                                    <Fragment>
                                        <p>Collection : </p>
                                        <ul>
                                            {this.state.collection.parts.map((part, index) => <li key={index}>{part.title}</li>)}
                                        </ul>
                                    </Fragment>
                                :
                                    <p>Collection not found</p>
                                }
                            </article>
                            <article className='movie-details_similar'>
                                <p>Silimar movies : </p>
                                {this.state.similarMovies ?
                                        <ul>
                                            {this.state.similarMovies.map((movie, index) => <li key={index}>{movie.title}</li>)}
                                        </ul>
                                    :
                                        <p>Loading similar movies</p>
                                }
                                <ul>
                                </ul>
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
