import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import NavLogo from './SideNav/NavLogo';

const NavWrapper = styled.div`
    width: 25%;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    grid-column: 1;
    grid-row: 1 / 4;
    background-color: #000000;
    color: #FFFFFF;
`;

const NavList = styled.ul`
    width: 100%;
    padding-left: 0px;
    list-style: none;
    margin-left: 30%;
`;

const NavListItem = styled.li`
    height: 50px;
    width: 50px;
    color: #FFFF;
    margin: auto;
    margin-bottom: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    font-size: 18px;
    border-bottom-style: solid;
    border-width: thick;
    border-color: #000000;
    &:hover {
        border-bottom-style: solid;
        border-width: thick;
        border-color: #ff6314;
    }
`;


const SideNav = () => {

    const handleLogout = ev => {
        localStorage.removeItem('token')
    }
    return (
        <NavWrapper>
            <NavList>
                <Link to='/' style={{display:'flex', justifyContent:'center'}}><NavLogo /></Link>
                <NavListItem style={{textDecoration: 'none', color:'white'}} to='/Feed'>

                    <a style={{textDecoration: 'none', color:'white'}} href='https://postithere.netlify.com/'>Welcome!</a>
                
                </NavListItem>
                <NavListItem>
                    <Link style={{textDecoration: 'none', color:'white'}} to='/Feed'>Feed</Link>
                </NavListItem>
                <NavListItem>
                    <Link style={{textDecoration: 'none', color: 'white'}} to='/Savedposts'>Saved Posts</Link>
                </NavListItem>
                <NavListItem>
                    <a style={{textDecoration: 'none', color:'white'}} target='_blank' href='http://reddit.com/r/'>reddit.com</a>
                </NavListItem>
                <NavListItem>
                    <Link to='/' style={{textDecoration: 'none', color:'white'}} onClick={handleLogout}>Logout</Link>
                </NavListItem>
            </NavList>
        </NavWrapper>
    )
}

export default SideNav; 