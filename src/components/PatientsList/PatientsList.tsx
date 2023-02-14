import { useState, useEffect, useCallback, useRef } from "react"

import { useAppSelector, useAppDispatch } from "store/hooks"
import { fetchPatients, getData } from "features/patients/patientsSlice"

import { Table, Button, Space, Spin } from "antd"
import "antd/dist/antd.css"
import { useHistory } from "react-router"

import FloatingButton from "components/PatientsList/FloatingButton/FloatingButton"

import IPatientsData from "models/PatientsModel"
import FilterComponent from "./FilterComponent/FilterComponent"
import PatientsModalRoute from "./PatientsModalRoute/PatientsModalRoute"

export interface IDataSource {
   key: string
   name: string
   gender: string
   birth: string
   id: number
}

export let itemsPerPage = 50

const getPage = () => {
   const path = window.location.pathname
   let page: number | string = path.substring(
      path.indexOf("=") + 1,
      path.indexOf("&")
   )   

   return Number(page) 
}


const PatientsList = () => {
   const [patientsTable, setPatientsTable] = useState<IDataSource[]>([])
   const [backupList, setBackupList] = useState<IDataSource[]>([])
   // const [patients, setPatients] = useState<IPatientsData[]>([])
   const [patients, setPatients] = useState<IPatientsData[]>([])
   const [currentPatientId, setCurrentPatientId] = useState<string>("")
   const [totalItemsFetched, setTotalItemsFetched] = useState<number>(0)

   const patientsFetch = useAppSelector(getData)
   const dispatch = useAppDispatch()
	const history = useHistory()
   const initialRender = useRef(true)

   const columns = [
      {
         title: "Name",
         dataIndex: "name",
         key: "name",
         align: "center" as "center",
      },
      {
         title: "Gender",
         dataIndex: "gender",
         key: "gender",
         align: "center" as "center",
      },
      {
         title: "Birth",
         dataIndex: "birth",
         key: "birth",
         align: "center" as "center",
      },
      {
         title: "Actions",
         dataIndex: "id",
         key: "actions",
         align: "center" as "center",

         render: (text: string, record: any) => (
            <Button
               type="primary"
               onClick={() => toggleModalHandler(record.id)}
            >
               View
            </Button>
         ),
      },
   ]

   const filterTablePerNameHandler = (search: string) => {
      let patientsFiltered = [...backupList]

      patientsFiltered = patientsFiltered.filter((patient, index) => {
         let lowName: string = patient.name.toLowerCase()
         let lowSearch = search.toLowerCase()
         return lowName.includes(lowSearch)
      })

      if (patientsFiltered.length > 0) {
         setPatientsTable(patientsFiltered)
      } else {
         alert("There is no patient with the entered name!")
      }
   }

   const filterTablePerGenderHandler = (filter: string) => {
      if (filter !== "both") {
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

   const loadPatientsHandler = useCallback(() => {
      let path = history.location.pathname
      let page: number | string = path.substring(
         path.indexOf("=") + 1,
         path.indexOf("&")
      )
      let id = path.substring(path.lastIndexOf(":") + 1, path.length)

      if (initialRender.current) {
         if (page === "") {
            page = "1"
            history.push(`${process.env.PUBLIC_URL}/page=1&`)
         } else {
            if (path.indexOf("id:") !== -1) {
               history.push(`${process.env.PUBLIC_URL}/page=${page}&id:${id}`)
            } else {
               history.push(`${process.env.PUBLIC_URL}/page=${page}&`)
            }
         }

         // Array.from(Array(Number(page)).keys()).forEach((page, index) => {
         //    let pageFetch = index + 1
         //    console.log('pageFetch: ', pageFetch);
            
            dispatch(fetchPatients({page: getPage(), isFirstRender: true}))
         // })
         initialRender.current = false
      } else {
         let newPage = Number(page) + 1
         history.push(`${process.env.PUBLIC_URL}/page=${newPage}&`)
         // dispatch(fetchPatients(Number(newPage)))
         dispatch(fetchPatients(({page: Number(newPage), isFirstRender: false})))
      }

      let totalItems = itemsPerPage * Number(page)

      setTotalItemsFetched(totalItems)
   }, [dispatch, history])

   const toggleModalHandler = (id: String | null, open?: boolean) => {
      // let path = history.location.pathname
      let path = history.location.pathname
      let page: number | string = path.substring(
         path.indexOf("=") + 1,
         path.indexOf("&")
      )

      if (open === false) {
         history.push(`${process.env.PUBLIC_URL}/page=${page}&`)
      } else {
         // history.push(`${process.env.PUBLIC_URL}${path}id:${id}`) // => Caminho para localhost
         history.push(`${process.env.PUBLIC_URL}/page=${page}&id:${id}`) // => Caminho para servidor online
      }
   }

   const formatDateHandler = (date: any) => {
      return date.substr(0, date.indexOf("T"))
   }

   useEffect(() => {
      if (initialRender.current) {         
         loadPatientsHandler()
      }
   }, [loadPatientsHandler])

   useEffect(() => {
      let updatedPatientsList = [...patientsFetch.patients]
      let baseURL =
         window.location.hostname === "localhost"
            ? window.location.host + "/pharma-inc"
            : "https://wegis.com.br/pharma-inc/"

      let path = history.location.pathname
      let page: number | string = path.substring(
         path.indexOf("=") + 1,
         path.indexOf("&")
      )

      updatedPatientsList = updatedPatientsList.map((patient, index) => {
         return {
            ...patient,
            id: index + 1,
            url: `${baseURL}/page=${page}&id:${index + 1}`,
            birthDate: formatDateHandler(patient.dob.date),
         }
      })

      setPatients(updatedPatientsList)
   }, [patientsFetch.patients, history])

   // Geral a lista de pacientes inicialmente partir da requisição
   // Acho que a lista está sendo reconstruída a cada vez que mostrar mais é clicado
   // O ideal é manter a lista já existente e só acrescentar os novos itens
   // Analisar se estou refazendo a requisição de tudo ou se estou fazendo a cada 50 e somente completando
   // Caso esteja só completando basta adaptar para que a state receba 50 de cada vez e não seja reiniciada
   // Caso contrário a lógica de requisição deve ser refeita, provavelmente há algo na doc
   // Mas acredito que esteja buscando a cda 50 e não todos todas as vezes
   useEffect(() => {
      let dataSource: IDataSource[] = []
      // console.log('dataSource: ', dataSource);
      // console.log('patientsTable: ', patientsTable);
      
      patientsFetch.patients.forEach((patient, index) => {
         let newObj = {} as IDataSource

         newObj.key = patient.name.first+'-'+index
         newObj.name = `${patient.name.title} ${patient.name.first} ${patient.name.last}`
         newObj.gender = patient.gender
         newObj.birth = formatDateHandler(patient.dob.date)
         newObj.id = index + 1

         dataSource.push(newObj)
      })
      // console.log('dataSource-2: ', dataSource);
      setPatientsTable((current) => [...current, ...dataSource])
      setBackupList((current) => [...current, ...dataSource])
      // setPatientsTable(dataSource)
      // setBackupList(dataSource)
   }, [patientsFetch.patients])
   console.log('patients.length: ', patients.length);
   console.log('totalItemsFetched: ', totalItemsFetched);
   useEffect(() => {
      let id = ""
      let path = history.location.pathname

      if (path.indexOf("id:") !== -1) {
         id = path.substr(path.indexOf(":") + 1)
      }

      setCurrentPatientId(id)
   }, [history.location.pathname])

   let path = history.location.pathname
   let page: number | string = path.substring(
      path.indexOf("=") + 1,
      path.indexOf("&")
   )

   return (
      <div>
         {patients.length >= totalItemsFetched && (
            <>
               <FloatingButton />
               <PatientsModalRoute 
                  page={page}
                  currentPatientId={currentPatientId}
                  patients={patients}
                  toggleModalHandler={toggleModalHandler}
               />
               <Space
                  direction="vertical"
                  style={{ 
							width: "90%", 
							marginLeft: "5%",
							
						}}
               >
						<FilterComponent 
							searchCallback={filterTablePerNameHandler}
							resetSearchCallback={ResetSearchHandler}
							searchPerGenderCallback={filterTablePerGenderHandler}
						/>
                  <Table
                     dataSource={patientsTable}
                     columns={columns}
                     bordered
                     pagination={false}
                  />
                  <Button
                     onClick={loadPatientsHandler}
                     loading={patientsFetch.status === "loading" ? true : false}
                     style={{
                        width: "fit-content",
                        marginTop: "20px",
                        marginBottom: "40px",
                     }}
                  >
                     {" "}
                     Load More Patients
                  </Button>
               </Space>
            </>
         )}
         {patients.length === 0 && (
            <div
               style={{
                  width: "100%",
                  height: "100vh",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
               }}
            >
               <Spin size="large" />
            </div>
         )}
      </div>
   )
}

export default PatientsList
