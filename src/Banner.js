import axios from './axios';
import React, {useState, useEffect } from 'react'
import './Banner.css';
import requests from './Requests';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';

function Banner() {
    const [movie, setMovie] = useState([]);
    useEffect(() => {
        async function fetchData() {
     const request = await axios.get(requests.fetchNetflixOriginals);
     setMovie(
        request.data.results[
          Math.floor(Math.random() * request.data.results.length - 1)
        ]
      );
      return request;
    }
    fetchData();
    }, [])
    const truncate = (string, n) => {
        return string?.length > n ? string.substr(0, n-1) + '...' : string;
    }
    return (
        <header className="banner" style={{
            backgroundImage: `url("https://image.tmdb.org/t/p/original/${movie.backdrop_path}")`,
            backgroundSize: "cover",
            backgroundPosition: "center center",
            }}>
            <div className="banner--fadeTop">
            </div>
            <div className="banner__contents">
                <h1 className="banner__title">{movie?.title || movie?.name || movie?.original_name}</h1>
                <h1 className="banner__description">{truncate(movie?.overview,150)}</h1>
                <div className="banner__buttons">
                    <button className="banner__button play"><PlayArrowIcon fontSize="large"/>&nbsp;&nbsp;Play</button>
                    <button className="banner__button info" ><InfoOutlinedIcon />&nbsp;&nbsp;&nbsp;More Info</button>
                </div>
            </div>
            <div className="banner--fadeBottom">
            </div>
        </header>
    )
}

export default Banner
