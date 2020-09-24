import React, { Component } from "react";

class Detail extends Component {

    constructor(props) {
        super(props);
      }

    render(){
        const movie = this.props.movies;
        console.log(movie)
        return(
            <div>
                <h1>{movie.title || movie.original_name}</h1>
            </div>
        )
    }
}

export default Detail;