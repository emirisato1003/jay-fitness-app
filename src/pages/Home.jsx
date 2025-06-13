import React from 'react';
import { Link } from 'react-router';

export default function Home() {
    return (
        <main className='home'>
            <button><Link to='/exercise'>explore exercise</Link></button>
        </main>
    );
}
