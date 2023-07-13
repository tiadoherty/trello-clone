import React from 'react';

import './Footer.css'

const Footer = () => {
    return (
        <div className='footer-bar'>
            <div className='person-container'>
                <p className='footer-title'>Built with ❤️ by</p>
                <a target='_blank' href='https://tiadoherty.github.io/' className='porfolio-link'>Tia Doherty</a>
                <div className='link-container'>
                    <a target='_blank' href='https://www.linkedin.com/in/tiadoherty/'><i class="fab fa-linkedin"></i></a>
                    <a target='_blank' href='https://github.com/tiadoherty'><i class="fab fa-github"></i></a>
                </div>
            </div>
        </div>
    )
}

export default Footer
