const apiKey = '07dc8f6435c41ca3ef4a46c9a0f91344';

export default class HttpClient {
    getMoviesList() {
        return this.sendRequest(`https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=1`);
    }

    getGenresList() {
        return this.sendRequest(`https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}&language=en-US`);
    }

    getMovieById(movie_id) {
        return this.sendRequest(`https://api.themoviedb.org/3/movie/${movie_id}?api_key=${apiKey}&language=en-US`);
    }

    getCollection(collection_id) {
        return this.sendRequest(`https://api.themoviedb.org/3/collection/${collection_id}?api_key=${apiKey}&language=en-US`);
    }

    getSimilarMovies(movie_id) {
        return this.sendRequest(`https://api.themoviedb.org/3/movie/${movie_id}/similar?api_key=${apiKey}&language=en-US&page=1`);
    }

    sendRequest(url) {
        return fetch(url)
            .then(response => response.json());
    }
}