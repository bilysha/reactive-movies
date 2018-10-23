const apiKey = '07dc8f6435c41ca3ef4a46c9a0f91344';

export const HttpClient = {
    getMoviesList: (filter, page) => {
        return sendRequest(`https://api.themoviedb.org/3/movie/${filter}?api_key=${apiKey}&language=en-US&page=${page}`);
    },

    getGenresList: () => {
        return sendRequest(`https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}&language=en-US`);
    },

    getMovieById: (movie_id) => {
        return sendRequest(`https://api.themoviedb.org/3/movie/${movie_id}?api_key=${apiKey}&language=en-US`);
    },

    getCollection: (collection_id) => {
        return sendRequest(`https://api.themoviedb.org/3/collection/${collection_id}?api_key=${apiKey}&language=en-US`);
    },

    getSimilarMovies: (movie_id) => {
        return sendRequest(`https://api.themoviedb.org/3/movie/${movie_id}/recommendations?api_key=${apiKey}&language=en-US&page=1`);
    },

    getMoviesByGenre: (genre_id, page) => {
        return sendRequest(`https://api.themoviedb.org/3/genre/${genre_id}/movies?page=${page}&sort_by=created_at.asc&language=en-US&api_key=${apiKey}`);
    },

    findMovies: (key, page) => {
        return sendRequest(`https://api.themoviedb.org/3/search/movie?query=${key}&page=${page}&language=en-US&api_key=${apiKey}`);
    },

    getMovieCredits: (movie_id) => {
        return sendRequest(`https://api.themoviedb.org/3/movie/${movie_id}/credits?api_key=${apiKey}`);
    },

    getMovieVideos: (movie_id) => {
        return sendRequest(`https://api.themoviedb.org/3/movie/${movie_id}/videos?api_key=${apiKey}&language=en-US`);
    }
};

const sendRequest = (url) => {
    return fetch(url)
        .then(response => response.json());
};

export default HttpClient;