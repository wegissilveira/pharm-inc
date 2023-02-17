export type AddressType = {
    street: {
        number: number,
        name: string
    },
    city: string,
    state: string,
    country: string,
    postcode: number
}

export default interface IPatientsData {
    picture: {
        large: string,
        medium: string,
        thumbnail: string,
    },
    name: {
        title: string,
        first: string,
        last: string,
    },
    formattedName: string,
    email: string,
    gender: string,
    dob: {
        date: string,
        age: number
    },
    phone: string,
    nat: string,
    location: AddressType,
    id: number,
    url?: string,
    birthDate: string
}