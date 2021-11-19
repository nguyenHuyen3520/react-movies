import React from 'react'
import { Link } from 'react-router-dom'

import bg from '../../assets/footer-bg.jpg'

import logo from '../../assets/tmovie.png'

const Footer = () => {

    const style = {
        display: 'flex',
        textAlign: 'center',
        alignItems: 'flex-start',
        fontSize: '1.5rem',
        flexDirection: 'column',
        marginTop: '1rem',
        fontWeight: '600',

    }
    return (
        <div className="footer" style={{ backgroundImage: `url(${bg})` }}>
            <div className="footer__content container">
                <div className="footer__content__logo">
                    <div className="logo">
                        <img src={logo} alt="" />
                        <Link to="/">tMovies</Link>
                    </div>
                </div>
                <div className="footer__content__menu">
                    <div
                        className="footer__content_menu_item"
                        style={style}
                    >
                        <Link to="/">Home</Link>
                        <Link to="/">Contact us</Link>
                        <Link to="/">Term of Service</Link>
                        <Link to="/">About us</Link>
                    </div>
                    <div className="footer__content_menu_item" style={style}>
                        <Link to="/">Live</Link>
                        <Link to="/">FAQ</Link>
                        <Link to="/">Premium</Link>
                        <Link to="/">Pravacy</Link>
                    </div>
                    <div className="footer__content_menu_item" style={style} >
                        <Link to="/">You must Watch</Link>
                        <Link to="/">Recent releases</Link>
                        <Link to="/">Top IMDB</Link>
                        <Link to="/">Premium</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Footer
