import React from 'react'

import { useAppSelector, useAppDispatch } from 'store/hooks'
import { fetchPatients, getData} from 'features/patients/patientsSlice'


const PatientsList: React.FC = () => {

    let [initialMount, setInitialMount] = React.useState(true)

    const patientsFetch = useAppSelector(getData)
    const dispatch = useAppDispatch()

    const incrementPage = patientsFetch.page


    React.useEffect(() => {
        if (initialMount) {
            dispatch(fetchPatients(incrementPage))
            setInitialMount(false)
        }
        
    }, [incrementPage, dispatch, initialMount])

    
    return (
        <div>
            <button onClick={() => dispatch(fetchPatients(incrementPage))}>UPDATE</button>
            <ul>
            {
                patientsFetch.patients.map((patient, index) => {
                    return <li key={patient.id.value+index}>{patient.name.first}</li>
                })
            }
            </ul>
        </div>
    )
}


export default PatientsList