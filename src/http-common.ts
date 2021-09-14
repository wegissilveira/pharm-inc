import axios from 'axios'

export const http = axios.create({
    baseURL: 'https://randomuser.me/api',
    headers:{
        content: {
            'Content-type': 'application/jason'
        }
    }
})