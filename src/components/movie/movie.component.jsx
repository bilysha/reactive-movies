import React from 'react';

import { Link } from 'react-router-dom';

import './movie.component.css';

export default class Movie extends React.Component {
    adjustPosterPath() {
        return `https://image.tmdb.org/t/p/w200${this.props.movie.poster_path}`;
    }

    sliceMovieOverview() {
        return this.props.movie.overview.length > 175 ?
            `${this.props.movie.overview.slice(0, 172)}...`
            :
            this.props.movie.overview;
    }

    spliceMovieGenres() {
        if (this.props.movie.genre_ids.length > 4) {
            this.props.movie.genre_ids.splice(3, this.props.movie.genre_ids.length - 3);
        }

        return this.props.movie.genre_ids;
    }

    render() {
        const movie = this.props.movie;

        return (
            <section className='movie'>
                <img className='movie_img' src={this.adjustPosterPath()} alt='movie_poster'></img>
                <article className='movie-body'>
                    <Link to={`/movie/${this.props.movie.id}`} className='link'>
                        <h3 className='movie-body_title'>
                            {movie.title}
                        </h3>
                    </Link>
                    <p className='movie-body_overview'>
                        {this.sliceMovieOverview()}
                    </p>
                    <article className='movie-body_genres'>
                        <p>Genres :</p>
                        <ul>
                            {this.spliceMovieGenres().map((id, index) => <li key={index}>{id}</li>)}
                        </ul>
                    </article>
                    <p className='movie-body_vote'>
                        {movie.vote_average}
                    </p>
                </article>
            </section>
        )
    }
}
