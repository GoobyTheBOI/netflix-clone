import React, { useState, useEffect } from "react";
import axios from "../../axios";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation, Pagination } from "swiper";
import "./row.css";
import "./swiper.scss";

SwiperCore.use([Navigation, Pagination]);

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

    // console.log(movies)
    // observer={true} observeParents={true}
    return (
        <div className="row">
            {/** Title */}
            <h2 className="row__title">{title}</h2>

            {/* several Posters */}
            <div className="row__posters">
                <Swiper
                    slidesPerView={6}
                    spaceBetween={20}
                    navigation
                    pagination
                    slidesPerGroup={4}
                    breakpoints={{
                        100: {
                            slidesPerView: 2,
                            spaceBetween: 10,
                        },
                        640: {
                            slidesPerView: 3,
                            spaceBetween: 10,
                        },
                        768: {
                            slidesPerView: 4,
                            spaceBetween: 10,
                        },
                        870: {
                            slidesPerView: 5,
                            spaceBetween: 10,
                        },
                        1024: {
                            slidesPerView: 6,
                            spaceBetween: 10,
                        },
                    }}
                >
                    {movies.map((movie) => (
                        // console.log(movie)

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
                            />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>

            {/* container -> posters */}
        </div>
    );
}

export default Row;
