import React, { Component } from "react";
import axios from "../../axios";
import "../Row/popup.scss";
import "./detail.scss";

class Detail extends Component {
    constructor() {
        super();
        this.state = { currentMovie: [], cast: []};
    }

    async componentDidMount() {
        const movies = this.props.movies;

        await axios.get(`https://api.themoviedb.org/3/movie/${movies.id}/credits?api_key=01437cb0b0717dea1516e3402f9ae2c1`).then(res => {
            const cast = res.data.cast;
            this.setState({ cast: cast });
        });

    }

    render() {
        const movie = this.props.movies;
        // console.log(movie)
        // console.log(this.state.currentMovie)
        return (
            <div className="detail">
                <div className="poster" style={{
                    backgroundSize: "cover",
                    backgroundImage: `url(https://image.tmdb.org/t/p/original/${movie?.backdrop_path})`,
                    backgroundPosition: "center center",
                }}></div>
                <div className="detail--fadeBottom"></div>
                <div className="detail__container">

                    <h1 className="detail__title">{movie.title || movie.original_title || movie.original_name}</h1>
                    <p className="detail__overview">{movie.overview}</p>
                </div>
            </div>
        );
    }
}

export default Detail;
