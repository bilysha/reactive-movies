import React from 'react';

import './movie.component.css';

export default class Movie extends React.Component {
    adjustPosterPath() {
        return `https://image.tmdb.org/t/p/w200${this.props.movie.poster_path}`;
    }

    render() {
        const movie = this.props.movie;

        return (
            <section className='movie'>
                <img className='movie_img' src={this.adjustPosterPath()} alt='movie_poster'></img>
                <article className='movie-body'>
                    <h3 className='movie-body_title'>
                        {movie.title}
                    </h3>
                    <p className='movie-body_overview'>
                        {movie.overview}
                    </p>
                    <article className='movie-body_genres'>
                        <p>Genres :</p>
                        <ul>
                            {movie.genre_ids.map((id, index) => <li key={index}>{id}</li>)}
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
