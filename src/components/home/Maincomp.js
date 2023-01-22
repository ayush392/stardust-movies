import React from 'react';
import Banner from './Banner'
import Slide from './Slide';
import './home.css';

const Maincomp = () => {

    return (
        <div className='home_section'>

            <div className='banner_part'>
                <Banner />
            </div>
            
            <Slide title="Popular" query='popular' />
            <Slide title="Upcoming" query='upcoming' />
            <Slide title="Top Rated" query='top_rated' />

        </div>
    )
}

export default Maincomp