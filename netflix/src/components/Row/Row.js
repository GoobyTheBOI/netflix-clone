import React, { useState, useEffect } from "react";
import axios from "../../axios";
import Swiper from "react-id-swiper";
import Detail from "../Detail/Detail.js";
import "./row.scss";
import "./swiper.scss";
import "./popup.scss";
// import $ from 'jquery';
import closeButton from './img/cancel.svg';

const image_url = "https://image.tmdb.org/t/p/original/";

function Row({ title, fetchUrl, isLargeRow }) {
    const [movies, setMovies] = useState([]);
    const [popup, setPopUp] = useState(false);
    let [currentMovie, setCurrentMovie] = useState([]);

    useEffect(() => {
        // if [] empty, run once when the row loads and don't run it again.
        async function fetchData() {
            const request = await axios.get(fetchUrl);
            setMovies(request.data.results);
            return request;
        }

        fetchData();
    }, [fetchUrl]);

    const params = {
        slidesPerView: 6,
        slidesPerGroup: 4,
        breakpoints: {
            100: {
                slidesPerView: 2,
                spaceBetween: 20,
                slidesPerGroup: 2,
                speed: 600,
            },
            640: {
                slidesPerView: 3,
                spaceBetween: 20,
                slidesPerGroup: 3,
                speed: 600,
            },
            768: {
                slidesPerView: 4,
                spaceBetween: 20,
                slidesPerGroup: 4,
                speed: 600,
            },
            870: {
                slidesPerView: 5,
                spaceBetween: 20,
                slidesPerGroup: 5,
                speed: 600,
            },
            1024: {
                slidesPerView: 6,
                spaceBetween: 20,
                slidesPerGroup: 6,
                speed: 600,
            },
        },
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        },
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
        spaceBetween: 20,
        observer: true,
        observeParents: true
    };



    const handleClick = (movie) => {
        setPopUp(true);
        // centered()
        setCurrentMovie(movie)
    };
    // console.log(movies)
    return (
        <div className="row">
            {/** Title */}
            <h2 className="row__title">{title}</h2>

            {/* several Posters */}
            <div className="row__posters">
                <Swiper {...params} shouldSwiperUpdate>
                    {movies.map((movie) => (
                        <div className="swiper-slide">
                            <img
                                className={`row__poster ${
                                    isLargeRow && "row__posterLargeRow"
                                }`}
                                onClick={() => {
                                    handleClick(movie);
                                }}
                                key={movie.id}
                                src={`${image_url}${
                                    isLargeRow
                                        ? movie.poster_path
                                        : movie.backdrop_path
                                }`}
                                alt={movie.name}
                            />
                        </div>
                    ))}
                    <div className="swiper-pagination"></div>

                    <div className="swiper-button-prev"></div>
                    <div className="swiper-button-next"></div>
                </Swiper>
            </div>
            {/* Popup */}
            {popup === true ?
                <div className="popup container">
                    <div className="detail-background"></div>
                    <div className="test">
                        <div className="flex" style={{height: '100%'}}>
                            <Detail movies={currentMovie} />
                            <div className="detail-close">
                                <button className="button" onClick={() => { setPopUp(false) }}><img src={closeButton} alt="Close" /></button>
                            </div>
                        </div>
                    </div>
                </div> :
            ''}
        </div>
    );
}

export default Row;
