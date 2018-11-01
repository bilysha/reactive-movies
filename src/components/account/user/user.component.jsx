import React from 'react';
import { connect } from 'react-redux';

import HttpClient from './../../../services/user.httpClient';

import MoviesList from './../../home/movies-list/movies-list.component';

import './user.component.css';

class UserPage extends React.Component {
    constructor(props) {
        super(props);

        this.userActions = [
            {
                name: 'Favorite'
            },
            {
                name: 'Watch List'
            }
        ];

        this.state = {
            activeAction: 'Favorite'
        };

        this.toggleUserAction = this.toggleUserAction.bind(this);
    }

    componentWillMount() {
        const { account } = this.props;

        switch(this.state.activeAction) {
            case 'Favorite':
                return HttpClient.getUserFavoriteMovies(account.user.id, account.sessionId)
                    .then((res) => console.log(res));
            default:
                return ;
        }
    }

    toggleUserAction(name) {
        console.log(this.props.state);
        this.setState({activeAction: name});
    }

    render() {
        const { user } = this.props;

        return (
            <section className='user-page'>
                <section className='user-information'>
                    <article>
                        <p>Username : <span className='name'>{user.username}</span></p>
                        <img src={this.props.userImage} alt='user_avatar' />
                        <p>Name : <span className='name'>{user.name}</span></p>
                    </article>
                    <article>
                        <button onClick={this.props.closeLoginSession}>Log Out</button>
                    </article>
                </section>
                <section className='tabs-container'>
                    <article className='tabs-container_btns-container'>
                        {this.userActions.map((item, index) => 
                            <button
                                key={index}
                                className={`${item.name === this.state.activeAction ? 'active' : ''}`}
                                onClick={() => this.toggleUserAction(item.name)}
                            >
                                {item.name}
                            </button>
                        )}
                    </article>
                </section>
            </section>
        )
    }
}

export default connect(
    state => ({account: state.account}),
    dispatch => ({})
)(UserPage);
