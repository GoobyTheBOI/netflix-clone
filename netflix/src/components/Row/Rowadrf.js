import React, { useState, useEffect } from "react";
import axios from "../../axios";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation, Pagination, Lazy } from "swiper";

import Detail from "../Detail/Detail.js";
import "./row.scss";
import "./swiper.scss";
import "./popup.scss";
// import "./row.css";
import "./swiper.scss";
import closeButton from './img/cancel.svg';
import $ from 'jquery';

SwiperCore.use([Navigation, Pagination, Lazy]);

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

    useEffect(() => {
        console.log(movies)
    })

    const handleClick = (movie) => {
        setPopUp(true);
        // centered()
        setCurrentMovie(movie)
    };

    $(window).trigger('resize');
    // observer={true} observeParents={true}


    return (
        <div className="row">
            {/** Title */}
            <h2 className="row__title">{title}</h2>

            {/* several Posters */}
            <div className="row__posters">
                <Swiper
                    slidesPerView={6}
                    // spaceBetween={20}
                    navigation
                    pagination
                    slidesPerGroup={4}
                    breakpoints={{
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
                    }}
                >
                    {movies.map((movie) => (
                        <SwiperSlide key={movie.id}>
                            <img
                                className={`row__poster ${
                                    isLargeRow && "row__posterLargeRow"
                                }`}
                                key={movie.id}
                                src={`${image_url}${
                                    isLargeRow
                                        ? movie.poster_path
                                        : movie.backdrop_path
                                }`}
                                alt={movie.name}
                                onClick={() => {
                                    handleClick(movie);
                                }}
                            />
                        </SwiperSlide>))}
                </Swiper>
            </div>

            {/* container -> posters */}
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
