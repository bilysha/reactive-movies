import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

import './login.component.css';

export default class LoginPage extends React.Component{
    render() {
        return (
            <Fragment>
                <section className='login-page'>
                    <section className='login-page_login'>
                        <article>
                            <h1>Built for moviefans</h1>
                            <p>Having authorized on this site you will have an opportunity to leave comments and to write descriptions to movies,
                                also you will be able to estimate the movie. In addition, you will have the opportunity to add movies to your favorites.</p>
                        </article>
                        <article className='login-page_login_form-container'>
                            <form className='shadow'>
                                <label> Login : <input type='text' name='login' ref={(input) => this.loginInput = input} /> </label>
                                <label> Password : <input type='password' name='user-password' ref={(input) => this.passwordInput = input} /> </label>
                                <span className='password_hint'>Make sure it's more than 15 characters, or at least 7 characters, and including a number.</span>
                                <button
                                    onClick={(e) => this.props.createLoginSession(e, this.loginInput.value, this.passwordInput.value)}
                                >
                                    {this.props.requestInProgress ?
                                        <div class="lds-spinner"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
                                    :
                                        <span>Log In</span>
                                }
                                </button>
                            </form>
                        </article>
                    </section>
                    <section className='login-page_no-accaunt'>
                        <h2>Do not have an account ?</h2>
                        <p>Unfortunately on this resource you do not have the opportunity to create an account.</p>
                        <p>Please accept our apologies.</p>
                        <p>To register, follow the link below.</p>
                        <a href='https://www.themoviedb.org/account/signup' target='blank' className='sign-up'>Sign Up</a>
                    </section>
                    <section className='login-page_benefits-container'>
                        <article className='benefits-list shadow'>
                            <p>Benefits of being a member</p>
                            <ul>
                                <li>Log the movies and TV shows you have watched</li>
                                <li>Keep track of your favourite movies and TV shows and get recommendations from them</li>
                                <li>Build and maintain a personal watchlist</li>
                                <li>Build custom mixed lists (movies and TV)</li>
                                <li>Take part in movie and TV discussions</li>
                                <li>Contribute to, and improve the information in our database</li>
                            </ul>
                        </article>
                        <article className='go-to-site-container'>
                            <p>But still you can go to the site without registration, but you lose the these benefits </p>
                            <Link to='/' className='colored-link go-to-site_btn'>Go to site</Link>
                        </article>
                    </section>
                </section>
            </Fragment>
        );
    }
}