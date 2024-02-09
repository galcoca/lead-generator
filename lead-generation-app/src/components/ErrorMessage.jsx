import React from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import imageNotFound from '../assets/images/404-Error.png';

const ErrorMessage = ({ message }) => {
    return(
        <React.Fragment>
            <div className="app">
                <Header />
                <div className="errorImageContainer">
                    <img className='errorImage' src={imageNotFound} alt="404-NotFound" />
                </div>
                <div className="errorMessage">{message}</div>
                <Link to="/" className='goToButton'>
                    <button>
                        Go Home
                    </button>
                </Link>
                <Footer />
            </div>
        </React.Fragment>
    )
};

export default ErrorMessage;