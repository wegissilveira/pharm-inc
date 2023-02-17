import { AddressType } from "models/PatientsModel"

export const formatAddress = (location: AddressType) => {
   return `${location.street.name}, ${location.street.number} - ${location.city}, ${location.country}`
}