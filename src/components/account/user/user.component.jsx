import React from 'react';

class UserPage extends React.Component {
    render() {
        const { user } = this.props;

        return (
            <section>
                <p>Succes login</p>
                <p>username : {user.username}</p>
                <p>original name : {user.name}</p>
                <button onClick={this.props.closeLoginSession}>Log Out</button>
            </section>
        )
    }
}

export default UserPage;
