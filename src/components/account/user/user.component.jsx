import React from 'react';
import { connect } from 'react-redux';

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

    toggleUserAction(name) {
        this.setState({activeAction: name});
    }

    render() {
        const { user } = this.props;

        return (
            <section>
                <section className="top">
                    <article className='user-information'>
                        <p>Username : <span className='name'>{user.username}</span></p>
                        <img src={this.props.userImage} alt='user_avatar' />
                        <p>Name : <span className='name'>{user.name}</span></p>
                    </article>
                    <article className='tabs-container'>
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
                <button onClick={this.props.closeLoginSession}>Log Out</button>
            </section>
        )
    }
}

export default connect(
    state => ({}),
    dispatch => ({})
)
(UserPage);
