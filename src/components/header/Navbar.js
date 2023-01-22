import React, { useState } from 'react'
import './navbar.css';
import SearchIcon from '@mui/icons-material/Search';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { Drawer, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import Rightheader from './Rightheader'
import logo from '../header/logo.png'

const Navbar = () => {

    const history = useNavigate();

    const [dropen, setDropen] = useState(false);

    const handleopen = () => {
        setDropen(true)
    }
    const handledeclose = () => {
        setDropen(false);
    }

    const [query, setQuery] = useState('');

    const handleChange = (e) => {
        setQuery(e.target.value);
    }

    const searchQuery = () => {
        // console.log(query);
        if (query) {
            setQuery("");
            history(`/movies/${query}`)
        }
    }

    return (
        <>
            <header>
                <nav>
                    <div className='left'>

                        <IconButton className='hamburgur' onClick={handleopen}>
                            <MenuIcon style={{ color: '#fff' }} />
                        </IconButton>

                        <Drawer open={dropen} onClose={handledeclose}>
                            <Rightheader logclose={handledeclose} />
                        </Drawer>

                        <div className='navlogo'>
                            <NavLink to='/'>
                                <img id='logoimg' className='logoimg' src={logo} alt='logo' />
                            </NavLink>
                        </div>

                    </div>
                    <div className="mid">
                        <div className='nav_btn hideAtMobile'>
                            <a href='/movies/popular'>Popular</a>
                        </div>
                        <div className='nav_btn hideAtMobile'>
                            <a href='/movies/upcoming'>Upcoming</a>
                        </div>
                        <div className='nav_btn hideAtMobile'>
                            <a href='/movies/top_rated'>Top Rated</a>
                        </div>
                    </div>

                    <form className='nav_searchbaar right' onClick={e => e.preventDefault()}>
                        <input type='text' name='query' id='query' value={query} onChange={handleChange} autoComplete='false' placeholder='Search here...' />

                        <button type='submit' className='search_icon' onClick={searchQuery}>
                            <SearchIcon id='search' />
                        </button>
                    </form>


                </nav>
            </header>
            <Outlet />
        </>
    )
}

export default Navbar