import React, { useState, useEffect } from "react";
import axios from "../../axios";
// import request from "../../request";
import Iframe from "react-iframe";
import requests from "../../request";
import YouTube from 'react-youtube';
import "./banner.css";

const API_KEY = "01437cb0b0717dea1516e3402f9ae2c1";

function Banner() {
    const [movie, setMovies] = useState([]);
    const [video, setVideo] = useState([]);

    const opts = {
        playerVars: {
            // https://developers.google.com/youtube/player_parameters
            autoplay: 1,
        },
    };
        
    // function myFunction() {
    //     setTimeout(() => {
    //     let trailer = document.getElementById("trailer");
    //         if (trailer.style.display === "none") {
    //             trailer.style.display = "block";
    //         } else {
    //             trailer.style.display = "none";
    //         }
    //     }, 100);
    // }

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
    }, [setMovies]);

    useEffect(() => {
        console.log(movie.id);
        async function fetchData() {
            const request = await axios.get(
                `${requests.fetchVideo}${movie.id}/videos?api_key=${API_KEY}`
            );
            setVideo(request.data.results[0]);

            return request;
        }
        fetchData();
    }, [movie, setVideo]);

    console.log(video);

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
            {video.key !== "" ? (
                <YouTube className="banner__trailer" id="trailer" videoId={`${video.key}`} onEnd={() => {console.log("trailer ends")}} opts={opts} />
            ) : (
                ""
            )}
            <div className="banner--fadeBottom"></div>
        </header>
    );
}

export default Banner;