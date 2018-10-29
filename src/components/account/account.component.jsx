import React from 'react';
import { connect } from 'react-redux';

import './account.component.css';

import Loader from './../loader/loader.component';
import LoginPage from './login/login.component';
import UserPage from './user/user.component';

import { autorizeUser, logOutUser } from '../../store/actions/user.action';

import userImage from './../../images/user.jpg';

class User extends React.Component {
    constructor(props) {
        super(props);

        this.createLoginSession = this.createLoginSession.bind(this);
        this.closeLoginSession = this.closeLoginSession.bind(this);
    }

    createLoginSession(e, username, password) {
        e.preventDefault();

        this.props.onAutorizeUser(username, password);
    }

    closeLoginSession() {
        this.props.onLogOutUser(this.props.account.sessionId);
    }

    render() {
        const { sessionId, requestInProgress, loggedIn, user } = this.props.account;

        return (
            <section className='account-container'>
                {sessionId ?
                    loggedIn ?
                        <UserPage
                            user={user}
                            userImage={userImage}
                            closeLoginSession={this.closeLoginSession}
                        />
                    :
                        <Loader text='Loading user information' />
                    
                :
                    <LoginPage
                        requestInProgress={requestInProgress}
                        userImage={userImage}
                        createLoginSession={this.createLoginSession}
                    />
                }
            </section>
        )
    }
}

export default connect(
    store => ({
        account: store.account
    }),
    dispatch => ({
        onAutorizeUser: (username, password) => {
            dispatch(autorizeUser(username, password));
        },

        onLogOutUser: (session_id) => {
            dispatch(logOutUser(session_id));
        }
    })
)(User);
