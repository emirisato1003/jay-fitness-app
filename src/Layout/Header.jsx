import React from 'react';
import { Link, NavLink } from 'react-router';
import styles from './Layout.module.css';

export default function Header() {
    const activeStyle = { textDecoration: 'underline' };
    return (
        <nav>
            <div className={styles.logo}><Link to='/'>#fitlife</Link></div>
            <div className={styles.navLink}>
                <NavLink style={({ isActive }) => isActive ? activeStyle : null} to='/exercise'>Exercise</NavLink>
                <NavLink style={({ isActive }) => isActive ? activeStyle : null} to='/about'>About</NavLink>
                <span>
                    <button className={styles.login}>Login</button>
                    <button className={styles.register}>register</button>
                </span>
            </div>
        </nav>
    );
}
