import { http } from 'http-common'

import { itemsPerPage } from 'components/PatientsList/PatientsList'


const getPatients = (page: number) => {
    return http.get(`https://randomuser.me/api/1.3/?page=${page}&results=${itemsPerPage}&seed=0c6282f4b3ce74b5&exc=login,registered,cell,id`)
}

const Services = {
    getPatients,
}

export default Services