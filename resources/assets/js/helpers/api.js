import axios from 'axios'

export function post(url, data) {
    return axios({
        method: 'POST',
        url: url,
        data: data
    })
}

export function get(url) {
    return axios({
        method: 'GET',
        url: url
    });
}