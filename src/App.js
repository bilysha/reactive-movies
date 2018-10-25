import React from 'react';
import { connect } from 'react-redux';
import { Switch, Route, Link, Redirect, NavLink } from 'react-router-dom';

import logo from './logo.svg';
import './styles/App.css';

import Home from './components/home/home.component';
import User from './components/account/account.component';

class App extends React.Component {
  render() {
    const { account } = this.props;

    return (
      <div className="App">
        <header>
          <Link to='/' className='header_link link'>
            <img src={logo} className="App-logo" alt="logo" />
          </Link>
          <nav>
            <ul>
              <li><NavLink to='/home' className='link'>Home</NavLink></li>
              <li><NavLink to='/user' className='link'>User</NavLink></li>
            </ul>
          </nav>
        </header>
        <main className='center-content'>
          <Switch>
            <Route exact path='/' render={() => <Redirect to={`/home`} /> } />
            <Route path='/home' component={Home} />
            <Route pth='/user' component={User} />
          </Switch>
        </main>
        <footer>
          <p>Copyrate © Ilya Belavusau</p>
        </footer>
      </div>
    );
  }
}

export default App;
