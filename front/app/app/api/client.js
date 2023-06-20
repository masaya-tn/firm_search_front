import applyCaseMiddleware from 'axios-case-converter'
import axios from 'axios'

const options = {
    ignoreHeaders: true,
}

const client = applyCaseMiddleware(
    axios.create({
        baseURL: 'https://firm-search-api-49e394da150b.herokuapp.com',
    }),
    options
);

export default client;
