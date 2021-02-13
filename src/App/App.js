import './App.scss';
import React, { Component } from 'react';
import { Redirect, Switch, Route } from 'react-router-dom';
import Header from '../Header/Header';
import Modal from '../Modal/Modal';
import Error from '../Error/Error';
import Loading from '../Loading/Loading';
import CardContainer from '../CardContainer/CardContainer';
import {getAllMovies } from '../util.js';



class App extends Component {
  constructor() {
    super();
    this.state = {
      movieData: [],
      movieID: NaN,
      modalShowing: false,
      searchTerm: '',
      errorThrown: false,
      loading: true
    }
  }

  componentDidMount() {
    getAllMovies()
    .then(movies => {
        if (!movies.status) {
          this.setState({movieData: movies.movies, loading: false})
        } else {
          this.setState({errorThrown: true, loading: false})
        }
    })
    .catch(error => console.log(error))
  }
  
  getAllMovieData = (movieID) => {
    const foundMovie = this.state.movieData.find(movie => movie.id.toString() === movieID);
    return foundMovie;
  }
  
  closeModal = () => {
    this.setState({modalShowing: false});
  }
  
  searchMovies = () => {
    const moviesFound = this.state.movieData.filter(movie => {
      return movie.title.toLowerCase().includes(this.state.searchTerm.toLowerCase())
    })
    return moviesFound
  }
  
  handleChange = event => {
    this.setState({searchTerm: event.target.value})
    this.searchMovies(event.target.value)
  }
  
  render() {
    if (this.state.errorThrown) {
      <Error />
    } else 
    if (this.state.loading) {
      return <Loading />
    } else {
      return (
        
        <div className="App">
          <Header 
            className="header"
            searchMovies={this.searchMovies}
            handleChange={this.handleChange}
            searchTerm={this.state.searchTerm}
          />
        <Switch>
            {/* { this.state.errorThrown && 
              <Route exact path="/error" component={Error} />
            } */}

            <Route exact path="/" render={() => 
              <CardContainer
                className="card-container" 
                movieData={!this.searchMovies(this.state.searchTerm).length ? 
                  this.state.movieData : this.searchMovies(this.state.searchTerm)} 
              />
            }/>

            <Route path='/:id' render={({ match }) => {
              const id = match.params.id

              return <Modal id={id} closeModal={this.closeModal}  />
                }
              }
            />

            

            <Route path='/error' render={() => <div>HERE IS AN ERROR</div>} />

          </Switch>
        </div>
      );
    }
  }
}

export default App;
