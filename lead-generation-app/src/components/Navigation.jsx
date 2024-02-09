import React from 'react';
import {Link} from 'react-router-dom';

const Navigation = () => {
    return (    
        <nav className='navBar'>
            <ul className='navBarList'>
                <li className='navBarListItem createLeads'>
                    <Link to="/" className='navBarItem'>Create Leads</Link>
                </li>
                <li className='navBarListItem leadList'>
                    <Link to="/leads" className='navBarItem'>Leads List</Link>
                </li>
            </ul>
        </nav>
    )
};

export default Navigation;
