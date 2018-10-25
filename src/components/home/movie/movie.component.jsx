import React from 'react';
import { connect } from 'react-redux';

import { Link } from 'react-router-dom';

import { markAsFavorite } from './../../../store/actions/user.action';

import './movie.component.css';

class Movie extends React.Component {
    constructor(props) {
        super(props);

        this.markAsFavorite = this.markAsFavorite.bind(this);
        this.addToWatchList = this.addToWatchList.bind(this);
    }

    markAsFavorite() {
        const { sessionId, loggedIn, user } = this.props.account;

        loggedIn ?
            this.props.onMarkAsFavorite({account_id: user.id, session_id: sessionId, media_id: this.props.movie.id})
        :
            console.log('not logged in', this.props.account)
    }

    addToWatchList() {
        this.props.account.loggedIn ?
            console.log('send add request')
        :
            console.log('not logged in')
    }

    sliceMovieOverview() {
        const { overview } = this.props.movie;

        return overview.length > 100 ?
            `${overview.slice(0, 97)}...`
        :
            overview;
    }

    spliceMovieGenres() {
        const { genre_ids } = this.props.movie;

        return genre_ids.length > 4 ?
            genre_ids.splice(3, genre_ids.length - 3 )
        :
            genre_ids;
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

            acc.push({ id, name});

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

    componentDidMount() {
        this.props.setVotes(this.votesContainer, this.props.movie.vote_average);
    }

    render() {
        const { movie } = this.props;

        return (
            <section className='movie'>
                <div className='movie-header'>
                    <Link to={`/home/movie/${this.props.movie.id}`} className='colored-link'>
                        <h3 className='movie_title'>
                            {movie.title}
                        </h3>
                    </Link>
                    <div className='movie-actions'>
                        <i className={`fa fa-heart ${this.props.account.favoriteList.indexOf(movie.id) > 0 ? 'favorite' : ''}`}></i>
                        <i className="fa fa-list"></i>
                    </div>
                </div>
                <article className='movie-body'>
                    <figure>
                        <div className='movie_img-wrapper'>
                            <img className='movie_img shadow' src={this.props.adjustPosterPath(movie.poster_path)} alt='movie_poster' tabIndex='0' />
                        </div>
                        <figcaption>
                            <article className='movie-body_genres'>
                                <p className='bold'>Genre :</p>
                                <ul>
                                    {this.spliceMovieGenres().map((genre, index) => 
                                        <li key={index}>
                                            <Link to={`/home/genre/${genre.id}/page/1`} className='dark-link'>
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
                    <p className='movie-body_vote' ref={(p) => this.votesContainer = p}>
                        <img src={this.props.votesStars} alt='votes_image' />
                    </p>
                    </article>
            </section>
        )
    }
}

export default connect(
    state => ({
        genresList: state.genresList,
        account: state.account
    }),
    dispatch => ({
        onMarkAsFavorite: (params) => {
            dispatch(markAsFavorite(params));
        }
    })
)(Movie);
