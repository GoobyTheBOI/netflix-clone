import React, { useState, useEffect } from "react";
import axios from "../../axios";
// import request from "../../request";
import requests from "../../request";
import YouTube from 'react-youtube';
import $ from 'jquery';
import "./banner.scss";


function Banner() {
    const [movie, setMovies] = useState([]);
    const [video, setVideo] = useState();

    const opts = {
        playerVars: {
            // https://developers.google.com/youtube/player_parameters
            autoplay: 1,
            controls: 0,
            showinfo: false,
            frameborder: 0,
            muted: 1,
        },
    };

    useEffect(() => {
        // if [] empty, run once when the row loads and don't run it again.
        async function fetchData() {
            const request = await axios.get(requests.fetchTrending);
            // Select one movie from array
            setMovies(
                request.data.results[
                    Math.floor(Math.random() * request.data.results.length - 1)
                ]
                // request.data.results[18]
            );
            return request;
        }
        fetchData();
    }, [setMovies]);


    // Movie trailers
    useEffect(() => {
        // console.log(movie.id);
        async function fetchData() {
            const API_KEY = "01437cb0b0717dea1516e3402f9ae2c1";
            
            const request = await axios.get(
                `${requests.fetchMovieVideo}${movie?.id}/videos?api_key=${API_KEY}`
            );
            // const testQuery = await axios.get(`${request.fetchTvVideo}${movie.id}/videos?api_key${API_KEY}`);
            
            if (request.data.results.length > 1 || request.data.results.length !== null) {
                setVideo(request.data.results[0]);  
                console.log("movie") 
            }
            return request;
        }
        fetchData();
    }, [movie, setVideo]);


    // Series Trailers
    useEffect(() => {
        // console.log(movie.id);
        async function fetchData() {
            const API_KEY = "01437cb0b0717dea1516e3402f9ae2c1";

            const trailerRequest = await axios.get(
                `${requests.fetchTvVideo}${movie?.id}/videos?api_key=${API_KEY}`
            );

            // const movieRequest = await axios.get(
            //     `${requests.fetchMovieVideo}${movie?.id}/videos?api_key=${API_KEY}`
            // );
            // const testQuery = await axios.get(`${request.fetchTvVideo}${movie.id}/videos?api_key${API_KEY}`);
            
            // setVideo(movieRequest.data.results[0])
            if(trailerRequest.data.results.lenght > 1 || trailerRequest.data.results !== null){
                setVideo(trailerRequest.data.results[0])
            }

            return trailerRequest;
        }
        fetchData();

    }, [movie, setVideo]);

    // console.log("movie:",movie,"trailer",video)
    console.log(video)
    // console.log(movie)

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
            <div className="videoWrapper">
                {video !== undefined ?
                    <YouTube className="banner__trailer" id="trailer" videoId={video.key} onEnd={() => {$("#trailer").hide()}} opts={opts} />
                : ''}
            </div>
            <div className="banner--fadeBottom"></div>
        </header>
    );
}

export default Banner;