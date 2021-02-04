
import './App.scss';
import React, { Component } from 'react';
import Header from '../Header/Header';
import Modal from '../Modal/Modal';
// import RabbitTrail from '../RabbitTrail/RabbitTrail'
import CardContainer from '../CardContainer/CardContainer';
import movieData from '../movieData';

class App extends Component {
  constructor() {
    super();
    this.state = {
      movieData: movieData.movies,
      movieID: 0
    }
  }

  // funciton here?
  // get click event
  // happens in card container


  // function that shows movie will be defined in app
  // pass this function into card container to grab the event.target
  // return that object (single movie) here
  // pass that object into modal for further destructuring

  getMovie = (event) => {
    const movieID = event.target.closest("article").id;

    this.setState({movieID: movieID});
    
  }

  getAllMovieData = (movieID) => {
    const foundMovie = this.state.movieData.find(movie => movie.id.toString() === movieID);

    return foundMovie;
  }


  
  render() {
    return (
      <div className="App">
        <Header className="header" />
        <Modal movieID={this.state.movieID} getAllMovieData={this.getAllMovieData}/>
        {/* <RabbitTrail className="rabbit-trail" /> */}
        <CardContainer className="card-container" movieData={this.state.movieData} getMovie={this.getMovie} />
      </div>
    );
  }
}

export default App;
