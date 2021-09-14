import { http } from 'http-common'

const getPatients = (page: number) => {
    return http.get(`https://randomuser.me/api/1.3/?page=${page}&results=10&seed=0c6282f4b3ce74b5&exc=login,registered,cell`)
}

const Services = {
    getPatients,
}

export default Services