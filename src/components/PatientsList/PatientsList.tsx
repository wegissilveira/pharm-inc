import React from 'react'

import { useAppSelector, useAppDispatch } from 'store/hooks'
import { fetchPatients, getData} from 'features/patients/patientsSlice'

import { Table, Button, Space } from 'antd'
import 'antd/dist/antd.css'

import PatientsModal from 'components/PatientModal/PatientModal'


interface IDataSource {
    key: number,
    name: string,
    gender: string,
    birth: string
}


const PatientsList: React.FC = () => {

    let [initialMount, setInitialMount] = React.useState(true)
    let [patients, setPatients] = React.useState<IDataSource[]>([])

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
            key: 'actions',
            align: 'center' as 'center',

            render: () => (
                <Button 
                    type="primary"
                >
                    Visualizar
                </Button>
            ),
          },
    ]   

    React.useEffect(() => {
        if (initialMount) {
            dispatch(fetchPatients(incrementPage))
            setInitialMount(false)
        }
    }, [incrementPage, dispatch, initialMount])
    
    React.useEffect(() => {
        let dataSource: IDataSource[] = []
       
        patientsFetch.patients.forEach((patient, index) => {
            let newObj:IDataSource = {
                key: 0,
                name: '',
                gender: '',
                birth: '',
            }
    
            newObj.key = patientsFetch.patients.length+index
            newObj.name = `${patient.name.title} ${patient.name.first} ${patient.name.last}`
            newObj.gender = patient.gender
            newObj.birth = patient.dob.date
    
            dataSource.push(newObj)
        })
        
        setPatients(() => dataSource)
    }, [patientsFetch.patients])
   

    return (
        <div>
            {/* <button onClick={() => dispatch(fetchPatients(incrementPage))}>UPDATE</button> */}
            <PatientsModal />
            <Space
                direction="vertical"
                style={{width: '90%', marginLeft: '5%'}}
            >
            <Table 
                dataSource={patients} 
                columns={columns} 
                title={() => 'Patients List'}
                bordered
                pagination={false}
            />
            <Button onClick={() => dispatch(fetchPatients(incrementPage))} >Load More Patients</Button>
            </Space>
        </div>
    )
}


export default PatientsList