import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';

function Navigation({ isLoggedIn }) {
	const sessionUser = useSelector(state => state.session.user);

	return (
		<div className='navbar-container'>
			<div className='logo-container'>
				<NavLink exact to="/" className='logo-text'><i className="fab fa-trello"></i> NotTrello</NavLink>
			</div>
			<div className='right-buttons-container'>
				{sessionUser && (
					<NavLink exact to="/boards/current" className='my-boards-text'>My Boards</NavLink>
				)}
				{isLoggedIn && (
					<ProfileButton user={sessionUser} />
				)}
			</div>
		</div>
	);
}

export default Navigation;
