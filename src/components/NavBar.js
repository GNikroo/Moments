import axios from 'axios'
import React from 'react'
import { Container, Nav, Navbar } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'
import logo from '../assets/logo.png'
import { useCurrentUser, useSetCurrentUser } from "../contexts/CurrentUserContext.js"
import useClickOutsideToggle from '../hooks/useClickOutsideToggle'
import styles from '../styles/NavBar.module.css'
import Avatar from './Avatar'

const NavBar = () => {
    const currentUser = useCurrentUser();
    const setCurrentUser = useSetCurrentUser();

    const handleSignOut = async () => {
        try {
            await axios.post("dj-rest-auth/logout/");
            setCurrentUser(null);
        } catch (err) {
            console.log(err);
        }
    };
    
    const { expanded, setExpanded, ref } = useClickOutsideToggle();
    
    const addPostIcon = (
        <>
            <NavLink
                activeClassName={styles.Active}
                className={styles.NavLink}
                to='/posts/create'
            >
                <i className="far fa-plus-square"></i>Add post
            </NavLink>
        </>
    )
    const loggedInIcons = 
        <>
            <NavLink
                activeClassName={styles.Active}
                className={styles.NavLink}
                to='/feed'
            >
                <i className="fas fa-stream"></i>Feed
            </NavLink>
            <NavLink
                activeClassName={styles.Active}
                className={styles.NavLink}
                to='/liked'
            >
                <i className="fas fa-heart"></i>Liked
            </NavLink>
            <NavLink
                to='/'
                onClick={handleSignOut}
            >
                <i className="fas fa-sign-out-alt"></i>Sign out
            </NavLink>
            <NavLink
                to={`/profiles/${currentUser?.profile_id}`}
                onClick={() => {}}
            >
            <Avatar src={currentUser?.profile_image} text="Profile" height={40} />
            </NavLink>
        </>
    const loggedOutIcons = (
        <>
            <NavLink
                activeClassName={styles.Active}
                className={styles.NavLink}
                to='/signin'
            >
                <i className="fas fa-sign-in-alt"></i>Sign in
            </NavLink>
            <NavLink
                activeClassName={styles.Active}
                className={styles.NavLink}
                to='/signup'
            >
                <i className="fas fa-user-plus"></i>Sign up
            </NavLink>
        </>
    );

  return (
    <div>
        <Navbar expanded={expanded} className={styles.NavBar} expand="md" fixed="top">
            <Container>
                <NavLink to='/'>
                    <Navbar.Brand>
                        <img src={logo} alt="logo" height="45" />
                    </Navbar.Brand>
                </NavLink>
                {currentUser && addPostIcon}
                <Navbar.Toggle ref={ref} onClick={() => setExpanded(!expanded)} aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ml-auto text-left">
                    <NavLink
                        exact activeClassName={styles.Active}
                        className={styles.NavLink}
                        to='/'
                    >
                        <i className="fas fa-home"></i>Home
                    </NavLink>
                    {currentUser ? loggedInIcons : loggedOutIcons}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    </div>
  )
}

export default NavBar