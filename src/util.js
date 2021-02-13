export const getAllMovies = () => {
  return fetch("https://rancid-tomatillos.herokuapp.com/api/v2/moviess")
  .then(response => {
    if (response.status >= 300) {
      return response
    } else {
      return response.json()
    }
  })
}

export const getMovie = (id) => {
  return fetch(`https://rancid-tomatillos.herokuapp.com/api/v2/movies/${id}`)
  .then(response => {
    if (response.status >= 300) {
      return response
    } else {
      return response.json()
    }
  })
}