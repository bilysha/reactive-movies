export default class HttpClient {
    getMoviesList() {
        return fetch(`https://api.themoviedb.org/3/movie/popular?api_key=07dc8f6435c41ca3ef4a46c9a0f91344&language=en-US&page=1`)
            .then(response => response.json());
    }

    getGenresList() {
        return fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=07dc8f6435c41ca3ef4a46c9a0f91344&language=en-US`)
            .then(response => response.json());
    }
}