import React from 'react';
import { Link } from 'react-router-dom'
import './NotFound.css'

const NotFound = () => {
    return (
        <div className="not-found-container">
            <h1>404</h1>
            <p className='not-found-title'>The page you are looking for does not exist</p>
            <Link to='/'>Home</Link>
        </div>
    )
}

export default NotFound
