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
    location: {
        street: {
            number: number,
            name: string
        },
        city: string,
        state: string,
        country: string,
        postcode: number,
    },
    id: number,
    url?: string,
    birthDate: string
}