const apiKey = '07dc8f6435c41ca3ef4a46c9a0f91344';

export const HttpClient = {
    getRequestToken: () => {
        return sendRequest(`https://api.themoviedb.org/3/authentication/token/new?api_key=${apiKey}`);
    },

    createLoginSession: (data) => {
        let myHeaders = new Headers();
        
        myHeaders.append("Content-Type", "application/json");
        
        const options = {
            method: 'POST',
            body: JSON.stringify(data),
            headers: myHeaders
        };

        return sendRequest(`https://api.themoviedb.org/3/authentication/token/validate_with_login?api_key=${apiKey}`, options);
    },

    createSession: (data) => {
        let myHeaders = new Headers();

        myHeaders.append("Content-Type", "application/json");
        
        const options = {
            method: 'POST',
            body: JSON.stringify(data),
            headers: myHeaders
        };

        return sendRequest(`https://api.themoviedb.org/3/authentication/session/new?api_key=${apiKey}`, options);
    },

    closeSession: (data) => {
        let myHeaders = new Headers();

        myHeaders.append("Content-Type", "application/json");

        const options = {
            method: 'DELETE',
            body: JSON.stringify({session_id: data}),
            headers: myHeaders
        };
        
        return sendRequest(`https://api.themoviedb.org/3/authentication/session?api_key=${apiKey}`, options);
    },

    getAccountDetails: (session_id) => {
        return sendRequest(`https://api.themoviedb.org/3/account?api_key=${apiKey}&session_id=${session_id}`);
    }
};

const sendRequest = (url, options) => {
    return fetch(url, options || {})
        .then(response => response.json());
};

export default HttpClient;