import React from 'react'

import classes from './PatientsModal.module.css'

import { createPortal } from 'react-dom'

import { CloseOutlined } from '@ant-design/icons'

import IPatientsData from 'models/PatientsModel'


interface StateProps {
    currentPatient: IPatientsData,
    toggleModal: (id: string | null, open: boolean) => void,
}

type Props = StateProps 


const PatientsModal: React.FC<Props> = props => {
    
    let [ address, setAddress] =  React.useState<string>('')
    let [ fullName, setFullName] =  React.useState<string>('')

    let { 
        picture,
        name,
        email, 
        gender, 
        birthDate, 
        phone, 
        nat, 
        location, 
        id, 
        url 
    } = props.currentPatient 

    React.useEffect(() => {
        let formattedAddress = `
            ${location.street.name}, ${location.street.number} - ${location.city}, ${location.country}
        `
        setAddress(formattedAddress)
    }, [location])

    React.useEffect(() => {
        let formattedName = `${name.title} ${name.first} ${name.last}`
        setFullName(formattedName)
    }, [name])


    return createPortal(
        <div className={classes['Modal-wrapper']}>
            <div className={classes['Modal-container']}>
                <CloseOutlined 
                    onClick={() => props.toggleModal(null, false)}
                    style={{
                        color: 'red', 
                        fontSize: '2em',
                        position: 'absolute',
                        right: '10px',
                        top: '10px',
                        cursor: 'pointer'
                    }}
                />
                <div className={classes['Modal-patientImg-container']}>
                    <img src={picture.large} alt="Patient" />
                </div>
                <h1 className={classes['Modal-patientName']}>
                    {fullName}
                </h1>
                <div className={classes['Modal-patientDetails']}>
                    <p><span>Email: </span>{email}</p>
                    <p><span>Gender: </span>{gender}</p>
                    <p><span>Birth date: </span>{birthDate}</p>
                    <p><span>Phone: </span>{phone}</p>
                    <p><span>Nationality: </span>{nat}</p>
                    <p><span>Address: </span>{address}</p>
                    <p><span>ID: </span>{id}</p>
                <p><span>URL: </span>{url}</p>
                </div>
            </div>
        </div>,
        document.getElementById("modal_root")!
    )
}

export default PatientsModal