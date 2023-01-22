import Avatar from '@mui/material/Avatar';
import Slide from '../home/Slide';
import { API_IMG, API_KEY } from '../key/key'
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'
import './moviedetails.css'


const MovieDetails = () => {

    const [movie, setMovie] = useState([]);
    const [genres, setGenres] = useState([]);
    const [country, setCountry] = useState([]);
    const [review, setReview] = useState([])

    const { id } = useParams();
    

    useEffect(() => {
        console.log(id);
        const url = `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}`;
        const reviewUrl = `https://api.themoviedb.org/3/movie/${id}/reviews?api_key=${API_KEY}&language=en-US`
        fetch(url)
            .then((res) => res.json())
            .then(data => {
                setMovie(data);
                setGenres(data.genres);
                setCountry(data.production_countries);
            })
        fetch(reviewUrl)
            .then((res) => res.json())
            .then(data => {
                setReview(data.results);
            })
    }, [])

    let posterUrl;
    if (movie.poster_path)
        posterUrl = API_IMG + movie.poster_path

    else
        posterUrl = 'https://th.bing.com/th/id/OIP.qbcqrRWIikjak63VtqI0DwAAAA?pid=ImgDet&rs=1'

    return (
        <div className='movie_section'>
            <div className='movie_container'>
                <div className='left_movie'>
                    <img src={posterUrl} alt="movie.title" />
                    <div className='movie_btn'>
                        {/* {(movie.homepage) && alert('Sorry, Movie page not available')} */}
                        <a className='movie_btn1' href={movie.homepage} onClick={() => {
                            (!movie.homepage) && alert('Sorry, Movie page not available')
                        }} >Watch now</a>
                        <a className='movie_btn3' href={movie.homepage} onClick={() => {
                            (!movie.homepage) && alert('Sorry, Movie page not available')
                        }} >Subscribe</a>
                    </div>
                </div>

                <div className='right_movie'>
                    <p><b>Language:</b> {movie.original_language}</p>
                    <p id='title'>{movie.original_title}</p>
                    <p><b>Overview:</b> {movie.overview}</p>
                    <p><b>Popularity:</b> {movie.popularity} million</p>
                    <p><b>Genres:</b> {genres.map(gen => {
                        return <span>{gen.name} </span>
                    })}
                    </p>
                    <p><b>Country:</b> {country.map(e => {
                        return <span>{e.name} </span>
                    })}
                    </p>
                    <p><b>Release Date:</b> {movie.release_date}</p>
                    <p><b>Vote: </b> {movie.vote_count}</p>
                    <p><b>Budget: $</b> {movie.budget}</p>
                    <p><b>Revenue: $</b> {movie.revenue}</p>
                </div>

            </div>
            <div className="reviews">
                {
                    review.length === 0
                    ||
                    <h1>Reviews:</h1>
                }
                {
                    review.map(e => {
                        let avatarUrl = e.author_details.avatar_path;
                        if (avatarUrl) {
                            if (avatarUrl.slice(0, 1) === '/') {
                                avatarUrl.slice(1, avatarUrl.length)
                            }
                            if (avatarUrl.slice(0, 4) !== '/htt') {
                                avatarUrl = API_IMG + avatarUrl;
                            }
                        }


                        return (<div className='eachReview'>
                            <div className='flex_container'>

                                {
                                    (avatarUrl == null || !avatarUrl)
                                        ? <Avatar />
                                        : <Avatar src={avatarUrl} />
                                }

                                <div>
                                    <p> {
                                        (e.author == null || !e.author)
                                            ? <b>Anonymous</b>
                                            : <b>{e.author}</b>
                                    }
                                    </p>
                                    <p>
                                        {e.created_at.slice(0, 10)}
                                    </p>
                                </div>
                            </div>
                            <p>{e.content}</p>
                        </div>)
                    })
                }
            </div>

            <Slide title="Suggested Movies: " query='top_rated' />
        </div >

    )
}


export default MovieDetails