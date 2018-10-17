import React from 'react';

import HttpClient from '../../services/httpClient';

import './genres.component.css';

export default class Genres extends React.Component {
    constructor(props) {
        super(props);

        this.httpClient = new HttpClient();

        this.state = {
            genres: []
        };
    }

    componentWillMount() {
        this.httpClient.getGenresList()
            .then(genres => this.setState({genres: genres.genres}));
    }

    render() {
        return (
            <section className='side-menu genres'>
                {this.state.genres.length > 0 ?
                    <ul>
                        {this.state.genres.map((genre, index) => <li key={index}>{genre.name}</li>)}
                    </ul>
                    :
                    <p>Waiting for genres</p>
                }
            </section>
        )
    }
}
