import React from "react";
import "./App.scss";
// import Row from "./components/Row/Row";
// import request from "./request";
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, {Navigation} from 'swiper';
import 'swiper/swiper.scss';
import Banner from "./components/Banner/Banner";

SwiperCore.use([Navigation]);

function App() {
    return (
        <div className="app">
            {/* Navbar */}

            {/* Banner */}
            {/* <Banner /> */}
            {/* <Row
                title="NETFLIX ORIGINALS"
                fetchUrl={request.fetchNetflixOriginals}
                isLargeRow
            />
            <Row title="TRENDING NOW" fetchUrl={request.fetchTrending} />
            <Row title="Top Rated" fetchUrl={request.fetchTopRated} />
            <Row title="Action Movies" fetchUrl={request.fetchActionMovies} />
            <Row title="Comedy Movies" fetchUrl={request.fetchComedyMovies} />
            <Row title="Horror Movies" fetchUrl={request.fetchHorrorMovies} />
            <Row title="Romance Movies" fetchUrl={request.fetchRomanceMovies} />
            <Row title="Documentaries" fetchUrl={request.fetchDocumentaries} /> */}

            <Swiper
                spaceBetween={50}
                slidesPerView={3}
                onSlideChange={() => console.log('slide change')}
                onSwiper={(swiper) => console.log(swiper)}
                >
                <SwiperSlide>Slide 1</SwiperSlide>
                <SwiperSlide>Slide 2</SwiperSlide>
                <SwiperSlide>Slide 3</SwiperSlide>
                <SwiperSlide>Slide 4</SwiperSlide>
                ...
            </Swiper>

        </div>
    );
}

export default App;
