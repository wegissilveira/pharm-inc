import React from 'react'

import { useAppSelector, useAppDispatch } from 'store/hooks'
import { fetchPatients, getData} from 'features/patients/patientsSlice'

import { Table, Button, Space, Spin, } from 'antd'
import 'antd/dist/antd.css'

import { Route, RouteComponentProps } from 'react-router'

import PatientsModal from 'components/PatientModal/PatientModal'

import IPatientsData from 'models/PatientsModel'


export interface IDataSource {
    key: number,
    name: string,
    gender: string,
    birth: string,
    id: number
}

interface MyComponent extends RouteComponentProps {}


const PatientsList: React.FC<MyComponent> = ({history}) => {

    let [initialMount, setInitialMount] = React.useState(true)
    let [patientsTable, setPatientsTable] = React.useState<IDataSource[]>([])
    let [patients, setPatients] = React.useState<IPatientsData[]>([])
    let [currentPatientId, setCurrentPatientId] = React.useState<string>('')

    const patientsFetch = useAppSelector(getData)
    const dispatch = useAppDispatch()

    const incrementPage = patientsFetch.page

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            align: 'center' as 'center'
        },
        {
            title: 'Gender',
            dataIndex: 'gender',
            key: 'gender',
            align: 'center' as 'center'
        },
        {
            title: 'Birth',
            dataIndex: 'birth',
            key: 'birth',
            align: 'center' as 'center'
        },
        {
            title: 'Actions',
            dataIndex: 'id',
            key: 'actions',
            align: 'center' as 'center',

            render: (text: string, record: any) => (
                <Button 
                    type="primary"
                    onClick={() => toggleModal(record.id)}
                >
                    Visualizar
                </Button>
            ),
        },
    ]   
    
    const toggleModal = (id: String | null, open?: boolean) => {
        if (open === false) {
            history.push(`${process.env.PUBLIC_URL}`)
        } else {
            history.push(`${process.env.PUBLIC_URL}/id:${id}`)
        }
    }

    React.useEffect(() => {
        if (initialMount) {
            dispatch(fetchPatients(incrementPage))
            setInitialMount(false)
        }
    }, [incrementPage, dispatch, initialMount])

    React.useEffect(() => {
        let updatedPatientsList = [...patientsFetch.patients]

        updatedPatientsList = updatedPatientsList.map((patient, index) => {
            return ({
                ...patient,
                id: index+1,
                url: `${process.env.PUBLIC_URL}/id:${index+1}`
            })
        })

        setPatients(updatedPatientsList)

    }, [patientsFetch.patients])
    
    React.useEffect(() => {
        let dataSource: IDataSource[] = []
       
        patientsFetch.patients.forEach((patient, index) => {
            
            let newObj:IDataSource = {
                key: 0,
                name: '',
                gender: '',
                birth: '',
                id: 0
            }
    
            newObj.key = index
            newObj.name = `${patient.name.title} ${patient.name.first} ${patient.name.last}`
            newObj.gender = patient.gender
            newObj.birth = patient.dob.date
            newObj.id = index+1
    
            dataSource.push(newObj)
        })

        setPatientsTable(() => dataSource)
    }, [patientsFetch.patients])
   
    React.useEffect(() => {
        let id = (history.location.pathname).replace( /^\D+/g, '')
        setCurrentPatientId(id)
    }, [history.location.pathname])


    return (
        <div>
            {patients.length > 0 &&
                <React.Fragment>
                    <Route 
                        path={`${process.env.PUBLIC_URL}/id:${currentPatientId}`}
                        render={() => {
                            return (
                                
                                    <PatientsModal 
                                        currentPatient={patients[Number(currentPatientId) -1]}
                                        toggleModal={toggleModal}
                                    />
                            )
                        }}
                    />
                    <Space
                        direction="vertical"
                        style={{width: '90%', marginLeft: '5%'}}
                    >
                    <Table 
                        dataSource={patientsTable} 
                        columns={columns} 
                        title={() => 'Patients List'}
                        bordered
                        pagination={false}
                    />
                    <Button onClick={() => dispatch(fetchPatients(incrementPage))} >Load More Patients</Button>
                    </Space>
                </React.Fragment>
            }
            {patients.length === 0 &&
                <div style={{
                        width: '100%',
                        height: '100vh',
                        display: 'flex', 
                        justifyContent:'center', 
                        alignItems:'center'
                    }}>
                    <Spin size="large" />
                </div>
            }
        </div>
    )
}


export default PatientsList