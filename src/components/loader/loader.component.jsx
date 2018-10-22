import React from 'react';

import './loader.component.css';

import logo from './../../logo.svg';

export default class Loader extends React.Component{
    render() {
        return (
            <div className='loader-wrapper'>
                <img src={logo} alt='loader' />
                <p>{this.props.text}</p>
            </div>
        )
    }
}
