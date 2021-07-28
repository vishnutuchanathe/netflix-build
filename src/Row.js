import React, {useState, useEffect} from 'react';
import axios from './axios';
import YouTube from 'react-youtube';
import movieTrailer from 'movie-trailer';
import "./Row.css";
// import ChevronRightIcon from '@material-ui/icons/ChevronRight';

const base_url = "https://image.tmdb.org/t/p/original"
function Row({ title, fetchUrl, isLargeRow, isNumberRow }) {
  const [movies, setMovies] = useState([]);
  const [trailerUrl, setTrailerUrl] = useState("");
  const number =["one.png", "two.png", "three.png", "four.png", "five.png", "six.png", "seven.png", "eight.png", "nine.png", "zero.png"];

  useEffect(() => {

    async function fetchData() {

      const request = await axios.get(fetchUrl);
      setMovies(request.data.results);
      if(isNumberRow){
        setMovies(request.data.results.slice(10));
      }
      return request;
    }
    fetchData();
  }, [fetchUrl]);

  const opts = {
    height: "390",
    width: "99%",
    playerVars: {
      autoplay: 0,
    }
  }

  const handleClick = (movie) => {
    // console.table(movie?.title)
    if (trailerUrl) {
      setTrailerUrl('')
    } else {
      movieTrailer(movie?.title || movie?.name || movie?.original_name || "")
        .then(url => {
          const urlParams = new URLSearchParams(new URL(url).search);
          setTrailerUrl(urlParams.get('v'));
        }).catch((error) => console.log(error));
    }
  }
    return (
        <div className="row">
            <h2 className="row__title">{title}</h2>
      <div className="row__posters">
        { movies.map(
          (movie,i) => 
          ((isNumberRow && (i<10) ) || (isLargeRow && movie.poster_path) ||
          (!isLargeRow && movie.backdrop_path)) && (
            <div className={`${isNumberRow && "row__numbers"}`}>
            {isNumberRow && <img className="row__number" src={number[i]} />}
            <img
            key={movie.id}
            onClick={() => handleClick(movie)}
            className={`row__poster ${isLargeRow && "row__posterLarge"} ${isNumberRow && "row__posterNumber"}`}
            src={`${base_url}${(isLargeRow || isNumberRow) ? movie.poster_path : movie.backdrop_path}`}
            alt={movie.name} />
            </div>
            
          )
        )}
      </div>
      <div style={{ padding: "20px" }}>
        {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}
      </div>
        </div>
    )
}

export default Row
