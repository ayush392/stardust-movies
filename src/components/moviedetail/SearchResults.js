import React from 'react'
import { useState, useEffect } from 'react';
import { API_KEY, API_IMG } from '../key/key'
import { useNavigate, useParams } from 'react-router-dom'
import { Pagination } from '@mui/material';
import "./searchResults.css";

const SearchResults = () => {
    const { movietype } = useParams();
    const history = useNavigate('');


    const [movies, setMovies] = useState([]);

    let url = '';

    if (movietype === 'popular' || movietype === 'top_rated' || movietype === 'upcoming') {
        url = `https://api.themoviedb.org/3/movie/${movietype}?api_key=${API_KEY}`;
    } else {
        url = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${movietype}`;
    }



    const searchMovie = async (e) => {

        console.log("Searching " + movietype);
        try {
            const res = await fetch(url);
            const data = await res.json();
            console.log(data);
            setMovies(data.results);
        }
        catch (e) {
            console.log(e);
        }
    }

    useEffect(() => {
        searchMovie();
    }, [movietype])

    return (
        <div className='abc'>
            <h1 className='mainTitle'>You searched: {movietype}</h1>
            <div className='grid-container' >
                {
                    movies.slice(0, 9).map((e, index) => {
                        let img_url;
                        if (e.poster_path)
                            img_url = API_IMG + e.poster_path;
                        else
                            img_url = 'https://th.bing.com/th/id/OIP.qbcqrRWIikjak63VtqI0DwAAAA?pid=ImgDet&rs=1'
                        return (

                            <div key={index} className='flex-container' onClick={() => history(`/movie/${e.id}`)}>
                                <div className='product_img'>
                                    <img src={img_url} alt="product Item" />
                                </div>
                                <h2 className='products_name'>{e.title}</h2>
                                <p className='products_offer'>{e.release_date}</p>
                            </div>

                        )
                    })
                }
            </div>
            <Pagination count={3} shape="rounded" />
        </div>
    )
}

export default SearchResults
