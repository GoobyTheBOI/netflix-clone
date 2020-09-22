import React, { useState, useEffect } from "react";
import axios from "../../axios";
import Swiper from "react-id-swiper";
import "./row.scss";
import "./swiper.scss";

const image_url = "https://image.tmdb.org/t/p/original/";

function Row({ title, fetchUrl, isLargeRow }) {
    const [movies, setMovies] = useState([]);

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
            },
            640: {
                slidesPerView: 3,
                spaceBetween: 20,
            },
            768: {
                slidesPerView: 4,
                spaceBetween: 20,
            },
            1024: {
                slidesPerView: 5,
                spaceBetween: 20,
            },
        },
        pagination: {
            el: ".swiper-pagination",
            type: "bullets",
            clickable: true,
        },
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
        spaceBetween: 20,
    };

    // console.log(movies)
    // observer={true} observeParents={true}
    return (
        <div className="row">
            {/** Title */}
            <h2 className="row__title">{title}</h2>

            {/* several Posters */}
            <div className="row__posters">
                <Swiper {...params} shouldSwiperUpdate rebuildOnUpdate>
                    {movies.map((movie) => (
                        <div className="swiper-slide">
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
                            />
                        </div>
                    ))}
                </Swiper>
            </div>
            {/* container -> posters */}
        </div>
    );
}

export default Row;
