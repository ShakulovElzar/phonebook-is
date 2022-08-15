import React from 'react';
import {Link} from 'react-router-dom';
import c from './Header.module.css'

const Header = () => {
    return (
        <header>
            <Link to="/" className={c.link}>
                <span className={c.phonebook}>ТЕЛЕФОННЫЙ СПРАВОЧНИК</span>
                <span className={c.phonebook__reporter}>МИНИСТЕРСТВА ФИНАНСОВ КЫРГЫЗСКОЙ РЕСПУБЛИКИ</span>
            </Link>
        </header>
    );
};

export default Header;