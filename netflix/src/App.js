import React from "react";
import "./App.scss";
import Row from "./components/Row/Row";
import request from "./request";
import Banner from "./components/Banner/Banner";
import Navbar from "./components/Navbar/Navbar";

function App() {
    return (
        <div className="app">
            {/* Navbar */}
            <Navbar />
            {/* Banner */}
            <Banner />
            <Row
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
            <Row title="Documentaries" fetchUrl={request.fetchDocumentaries} />
        </div>
    );
}

export default App;
