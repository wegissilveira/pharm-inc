import React from 'react'

import { useAppSelector, useAppDispatch } from 'store/hooks'
import { fetchPatients, getData} from 'features/patients/patientsSlice'

import { Table, Button, Space, Spin} from 'antd'
import 'antd/dist/antd.css'

import { Route, RouteComponentProps } from 'react-router'

import PatientsModal from 'components/PatientModal/PatientModal'
import PatientsListFilter from 'components/PatientsListFilter/PatientsListFilter'

import IPatientsData from 'models/PatientsModel'


export interface IDataSource {
    key: number,
    name: string,
    gender: string,
    birth: string,
    id: number
}

interface MyComponent extends RouteComponentProps {}

export const itemsPerPage = 10

// const { Search } = Input


const PatientsList: React.FC<MyComponent> = ({history}) => {

    let [initialMount, setInitialMount] = React.useState(true)
    let [patientsTable, setPatientsTable] = React.useState<IDataSource[]>([])
    let [backupList, setBackupList] = React.useState<IDataSource[]>([])
    let [patients, setPatients] = React.useState<IPatientsData[]>([])
    let [currentPatientId, setCurrentPatientId] = React.useState<string>('')
    let [currentPage, setCurrentPage] = React.useState<string>('')
    // let [search, setSearch] = React.useState<string>('')

    const patientsFetch = useAppSelector(getData)
    const dispatch = useAppDispatch()

    // const incrementPage = patientsFetch.page
    
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
                    onClick={() => toggleModalHandler(record.id)}
                >
                    Visualizar
                </Button>
            ),
        },
    ]   

    // const updateSearchHandler = (value: string) => {
    //     setSearch(value)
    // }

    const filterTablePerNameHandler = (search: string) => {
        let patientsFiltered = [...backupList]
        
        patientsFiltered = patientsFiltered.filter((patient, index) => {
            let lowName = patient.name.toLowerCase()
            let lowSearch = search.toLowerCase()
            return lowName.includes(lowSearch)
        })

        if (patientsFiltered.length > 0) {
            setPatientsTable(() => patientsFiltered)
        } else {
            alert('There is no patient with the entered name!')
        }
        
    }

    const filterTablePerGenderHandler = (filter: string) => {
        
        if (filter !== 'both') {
            let patientsFiltered = [...backupList]
        
            patientsFiltered = patientsFiltered.filter((patient, index) => {
                let lowName = patient.gender.toLowerCase()
                let lowSearch = filter.toLowerCase()
                return lowName === lowSearch
            })
    
            setPatientsTable(patientsFiltered)

        } else {
            setPatientsTable(backupList)
        }
    }

    const ResetSearchHandler = () => {
        setPatientsTable(backupList)
    }
    
    const loadPatientsHandler = React.useCallback(() => {
        let path = history.location.pathname
        let page = path.substring(path.indexOf("=") + 1, path.indexOf("&"))
                
        if (initialMount) {
            if (page === '') {
                page = '1'
                history.push(`${process.env.PUBLIC_URL}/page=1&`)
            } else {
                history.push(`${process.env.PUBLIC_URL}${history.location.pathname}`)
            }

            Array.from(Array(Number(page)).keys()).forEach((page, index) => {
                let pageFetch = index + 1
                dispatch(fetchPatients(pageFetch))
            })

        } else {
            console.log(page)
            let newPage = Number(page) + 1
            history.push(`${process.env.PUBLIC_URL}/page=${newPage}&`)
            dispatch(fetchPatients(Number(page)))
        }        
        
        setCurrentPage(page)
        setInitialMount(false)
    }, [dispatch, history, initialMount])
    
    const toggleModalHandler = (id: String | null, open?: boolean) => {
        let path = history.location.pathname
        
        if (open === false) {
            history.push(`${process.env.PUBLIC_URL}/page=${currentPage}&`)
        } else {
            history.push(`${process.env.PUBLIC_URL}${path}id:${id}`)
        }
    }

    const formatDateHandler = (date: any) => {
        return (date).substr(0, date.indexOf('T'))
    }

    React.useEffect(() => {
        if (initialMount) {
            loadPatientsHandler()
            setInitialMount(false)
        }
    }, [loadPatientsHandler, initialMount])

    React.useEffect(() => {
        let updatedPatientsList = [...patientsFetch.patients]
        let baseURL = window.location.hostname === 'localhost' ? window.location.host : process.env.PUBLIC_URL

        updatedPatientsList = updatedPatientsList.map((patient, index) => {
            return ({
                ...patient,
                id: index+1,
                url: `${baseURL}/page=${currentPage}&id:${index+1}`,
                birthDate: formatDateHandler(patient.dob.date)
            })
        })

        setPatients(updatedPatientsList)

    }, [patientsFetch.patients, history, currentPage])
    
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
            newObj.birth = formatDateHandler(patient.dob.date)
            newObj.id = index+1
    
            dataSource.push(newObj)
        })

        setPatientsTable(() => dataSource)
        setBackupList(dataSource)

    }, [patientsFetch.patients])
   
    React.useEffect(() => {
        let id = ''
        let path = history.location.pathname
        if (path.indexOf('id:') !== -1) {
            id = path.substr(path.indexOf(':') + 1)
        }

        setCurrentPatientId(id)
    }, [history.location.pathname])


    return (
        <div>
            {patients.length >= (Number(currentPage) * itemsPerPage) &&
                <React.Fragment>
                    <Route 
                        path={`${process.env.PUBLIC_URL}/page=${currentPage}&id:${currentPatientId}`}
                        render={() => {
                            return (
                                <PatientsModal 
                                    currentPatient={patients[Number(currentPatientId) -1]}
                                    toggleModal={toggleModalHandler}
                                />
                            )
                        }}
                    />
                    <Space
                        direction="vertical"
                        style={{width: '90%', marginLeft: '5%'}}
                    >
                    <PatientsListFilter 
                        searchCallback={filterTablePerNameHandler}
                        searchPerGenderCallback={filterTablePerGenderHandler}
                        resetSearchCallback={ResetSearchHandler}
                    />
                    <br />
                    <Table 
                        dataSource={patientsTable} 
                        columns={columns} 
                        bordered
                        pagination={false}
                    />
                    <Button onClick={loadPatientsHandler} >Load More Patients</Button>
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