import React from 'react';
import { connect } from 'react-redux';

import { Link } from 'react-router-dom';

import './movie.component.css';

class Movie extends React.Component {
    adjustPosterPath() {
        return `https://image.tmdb.org/t/p/w500${this.props.movie.poster_path}`;
    }

    sliceMovieOverview() {
        return this.props.movie.overview.length > 100 ?
            `${this.props.movie.overview.slice(0, 97)}...`
            :
            this.props.movie.overview;
    }

    spliceMovieGenres() {
        if (this.props.movie.genre_ids.length > 4) {
            this.props.movie.genre_ids.splice(3, this.props.movie.genre_ids.length - 3);
        }

        return this.props.movie.genre_ids;
    }

    transformMovieGenres(props) {
        const genres = props.movie.genre_ids.reduce((acc, id) => {
            let name;

            props.genresList.map(genre =>
                name = name ?
                    name
                : id === genre.id ?
                        genre.name
                    :
                        null
            );

            acc.push({
                id,
                name
            });

            return acc;
        },[]);

        props.movie.genre_ids = genres;
    }

    componentWillMount() {
        this.transformMovieGenres(this.props);
    }

    componentWillReceiveProps(nextProps) {
        this.transformMovieGenres(nextProps);
    }

    render() {
        const movie = this.props.movie;

        return (
            <section className='movie'>
                <div className='movie-header'>
                    <Link to={`/movie/${this.props.movie.id}`} className='colored-link'>
                        <h3 className='movie_title'>
                            {movie.title}
                        </h3>
                    </Link>
                    <i className="fa fa-star"></i>
                </div>
                <article className='movie-body'>
                    <figure>
                        <div className='movie_img-wrapper'>
                            <img className='movie_img' src={this.adjustPosterPath()} alt='movie_poster' tabIndex='0' />
                        </div>
                        <figcaption>
                            <article className='movie-body_genres'>
                                <p className='bold'>Genre :</p>
                                <ul>
                                    {this.spliceMovieGenres().map((genre, index) => 
                                        <li key={index}>
                                            <Link to={`/genre/${genre.id}/page/1`} className='dark-link'>
                                                {genre.name}
                                            </Link>
                                        </li>
                                    )}
                                </ul>
                            </article>
                            <p className='movie-body_release bold'>
                                Release :
                                <span>{movie.release_date}</span>
                            </p>
                        </figcaption>
                    </figure>
                    <p className='movie-body_overview'>
                        {this.sliceMovieOverview()}
                    </p>
                    <p className='movie-body_vote'>
                        {movie.vote_average}
                    </p>
                    </article>
            </section>
        )
    }
}

export default connect(
    state => ({
        genresList: state.genresList
    }),
    dispatch => ({})
)(Movie);
