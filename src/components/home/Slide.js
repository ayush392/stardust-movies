import { Divider } from '@mui/material';
import { useState, useEffect } from 'react';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import "../home/slide.css";
import { API_KEY, API_IMG} from '../key/key'
import { useNavigate } from 'react-router-dom'
// import './slide.css';



const responsive = {
    desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 4
    },
    tablet: {
        breakpoint: { max: 1024, min: 464 },
        items: 2
    },
    mobile: {
        breakpoint: { max: 464, min: 0 },
        items: 1
    }
};

const Slide = ({ title, query }) => {


    const history = useNavigate('');

    const [movies, setMovies] = useState([]);

    useEffect(() => {
        const url = `https://api.themoviedb.org/3/movie/${query}?api_key=${API_KEY}`;
        fetch(url)
            .then((res) => res.json())
            .then(data => {
                setMovies(data.results);
            })
    }, [])


    return (
        <div className='movies_section' >
            <div id={`${query}`} className="justGap"></div>
            <div className='movies_deal'>
                <h3>{title}</h3>
                <button className='view_btn' onClick={() => history(`/movies/${query}`)}>View All</button>
            </div>
            <Divider />

            <Carousel
                responsive={responsive}
                infinite={true}
                draggable={false}
                swipeable={true}
                centerMode={true}
                autoPlay={true}
                autoPlaySpeed={4000}
                keyBoardControl={true}
                showDots={false}
                removeArrowOnDeviceType={["tablet", "mobile"]}
                dotListClass="custom-dot-list-style"
                itemClass="carousel-item-padding-40-px"
                containerClass="carousel-container"
            >

                {
                    movies.slice(0, 15).map((e, index) => {
                        let img_url;
                        if (e.poster_path)
                            img_url = API_IMG + e.poster_path;
                        else
                            img_url = 'https://th.bing.com/th/id/OIP.qbcqrRWIikjak63VtqI0DwAAAA?pid=ImgDet&rs=1'
                        return (
                            <div key={index} className='movies_items' onClick={() => history(`/movie/${e.id}`)}>
                                <div className='movie_img'>
                                    <img src={img_url} alt="movie Item" />
                                </div>
                                <div className='desc'>
                                    <p className='movies_name'>{e.title}</p>
                                    {query === 'popular' && <p className='popularity'>Popularity: {e.popularity} million</p>}
                                    {query === 'upcoming' && <p className='release_date'>Release Date: {e.release_date}</p>}
                                    {query === 'top_rated' && <div>
                                        <p className='vote'>Vote Count: {e.vote_count} </p>
                                        <p className='vote'>Vote Average: {e.vote_average}</p>
                                    </div>}

                                    <p className='overview'>{e.overview.slice(0, 70) + '...'}</p>
                                    {/* </Navigate> */}
                                </div>
                            </div>
                        )
                    })
                }
            </Carousel >
        </div >

    )
}

export default Slide