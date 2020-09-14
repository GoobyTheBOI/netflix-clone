import React, { useState, useEffect } from "react";
import axios from "../../axios";
import requests from "../../request";
import "./banner.css";

function Banner() {
    const [movie, setMovies] = useState([]);

    useEffect(() => {
        // if [] empty, run once when the row loads and don't run it again.
        async function fetchData() {
            const request = await axios.get(requests.fetchTrending);
            // Select one movie from array
            setMovies(
                request.data.results[
                    Math.floor(Math.random() * request.data.results.length - 1)
                ]
            );
            return request;
        }
        fetchData();
    }, []);

    console.log(movie);

    function truncate(str, n) {
        return str?.length > n ? str.substr(0, n - 1) + "..." : str;
    }

    return (
        <header
            className="banner"
            style={{
                backgroundSize: "cover",
                backgroundImage: `url(https://image.tmdb.org/t/p/original/${movie?.backdrop_path})`,
                backgroundPosition: "center center",
            }}
        >
            <div className="banner__content">
                <h1 className="banner__title">
                    {movie?.name || movie?.title || movie?.original_name}
                </h1>
                <div className="banner__buttons">
                    <button className="banner__button">Play</button>
                    <button className="banner__button">My List</button>
                </div>
                <p className="banner__description">
                    {truncate(movie?.overview, 150)}
                </p>
            </div>
            <div className="banner--fadeBottom"></div>
        </header>
    );
}

export default Banner;
