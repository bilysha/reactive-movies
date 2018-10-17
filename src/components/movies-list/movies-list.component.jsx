import React from 'react';

import HttpClient from './../../services/httpClient';

import Movie from './../movie/movie.component';

export default class MoviesList extends React.Component {
    constructor(props) {
        super(props);
        this.httpClient = new HttpClient();

        this.state = {
            movies: []
        };
    }

    componentWillMount() {
        this.httpClient.getMoviesList()
            .then(res => this.setState({movies: res.results}));

    }

    render() {
        return (
            <section className='main-content'>
                {this.state.movies.length !== 0 ?
                    <ul>
                        {this.state.movies.map((item, index) => <Movie key={index} movie={item}></Movie>)}
                    </ul>
                    :
                    <p>Waiting for movies</p>
                }
            </section>
        )
    }
}