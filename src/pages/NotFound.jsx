import React from 'react';
import { Link } from 'react-router';

export default function NotFound() {
    return (
        <div>
            <h1>404</h1>
            <h2>Sorry, the page you were looking for was not found.</h2>
            <button>
                <Link to='/'>Return to home</Link>
            </button>
        </div>
    );
}
