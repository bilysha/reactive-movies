import React, { Fragment } from 'react';
import { connect } from 'react-redux';

import { Link } from 'react-router-dom';

import './movie-details.component.css';
import votesImage from './votes_average.gif';
import noPhoto from './no_poster_image_available.jpeg';
import Loader from './../loader/loader.component';

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
            cast: null,
            movieVideos: null,
            activeVideo: null
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
            this.uploadMovie(nextProps.match.params.movieId);
        }
    }

    uploadMovie(movie_id) {
        this.httpClient.getMovieById(parseInt(movie_id, 10))
        .then((movie) => {
            const similarMovies = this.httpClient.getSimilarMovies(movie.id);
            const collection = movie.belongs_to_collection ? this.httpClient.getCollection(movie.belongs_to_collection.id) : Promise.resolve({});
            const credits = this.httpClient.getMovieCredits(movie.id);
            const videos = this.httpClient.getMovieVideos(movie.id);

            Promise.all([collection, credits, similarMovies, videos])
                .then((movieData) => {
                     this.setState({
                        movie: movie,
                        collection: movieData[1].name,
                        collectionParts: this.sliceArray(movieData[0].parts, 5),
                        cast: this.sliceArray(movieData[1].cast, 10),
                        similarMovies: this.sliceArray(movieData[2].results, 5),
                        movieVideos: movieData[3].results,
                        activeVideo: movieData[3].results[0]
                    });
                    this.props.onSwitchActiveFilter(movie.title);
                });
        });
    }

    sliceArray(array, number) {
        return (array && array.length > number) ?
            array.slice(0, number)
        :
            array;
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
                            <article className='movie-details_video'>
                                <p className='movie-details-article_title'>Video</p>
                                {this.state.movieVideos ?
                                    <div className='video-wrapper'>
                                        <div className='iframe-wrapper'>
                                            <iframe src={`https://www.youtube.com/embed/${this.state.activeVideo.key}`} allowFullScreen title='movie video'></iframe>
                                        </div>
                                        <ul>
                                            {this.state.movieVideos.map((video, index) => 
                                                <li key={index} onClick={() => this.setState({activeVideo: video})} className={this.state.activeVideo.id === video.id ? 'active' : ''}>
                                                    {video.name}
                                                </li>
                                            )}
                                        </ul>
                                    </div>
                                :
                                    <p className='movie-details_no-data'>We can not find any video related to this movie</p>
                                }
                            </article>
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
                                    <p className='movie-details_no-data'>We do not found any information about cast</p>
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
                                    <p className='movie-details_no-data'>We do not know nothing about production companies</p>
                                }
                            </article>
                            <article className='movie-details_collection'>
                                <p className='movie-details-article_title'>Collection</p>
                                {this.state.collectionParts ?
                                    <Fragment>
                                        <p className='movie-details_no-data'>{this.state.collection}</p>
                                        <ul>
                                            {this.state.collectionParts.map((part, index) =>
                                                <li key={index} onClick={() => this.props.history.push(`/movie/${part.id}`)}>
                                                    <figure>
                                                        <img src={this.adjustPosterPath(part.poster_path)} alt='collection_part_poster'/>
                                                        <figcaption>
                                                            {part.title}
                                                        </figcaption>
                                                    </figure>
                                                </li>
                                            )}
                                        </ul>
                                    </Fragment>
                                :
                                    <p className='movie-details_no-data'>No collection found for this movie</p>
                                }
                            </article>
                            <article className='movie-details_similar'>
                                <p className='movie-details-article_title'>Recomendations</p>
                                {this.state.similarMovies.length ?
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
                                    <p className='movie-details_no-data'>We do not have any recomendation for this movie</p>
                                }
                            </article>
                        </Fragment>
                        :
                            <Loader text='Wait please... Loading movie information...'></Loader>
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
