import React from 'react'

import classes from './PatientsModal.module.css'


const PatientsModal: React.FC = () => {
    return (
        <div className={classes['Modal-wrapper']}>
            <div className={classes['Modal-container']}>
                <div className={classes['Modal-patientImg-container']}>
                    
                </div>
                <h1 className={classes['Modal-patientName']}>Clinic's Patient One</h1>
                <div className={classes['Modal-patientDetails']}>
                    <p><span>Email: </span>teste teste</p>
                    <p><span>Gender: </span>teste teste</p>
                    <p><span>Birth date: </span>teste teste</p>
                    <p><span>Phone: </span>teste teste</p>
                    <p><span>Nationality: </span>teste teste</p>
                    <p><span>Address: </span>teste teste</p>
                    <p><span>ID: </span>teste teste</p>
                    <p><span>URL: </span>teste teste</p>
                </div>
            </div>
        </div>
    )
}

export default PatientsModal

/* 
    Imagem
    Nome completo
    Email
    Gênero
    Data de nascimento
    Telefone
    Nacionalidade
    Endereço
    ID (Número de identificação)
    URL para compartilhamento
*/