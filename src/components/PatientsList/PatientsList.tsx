import { useState, useEffect, useCallback, useRef } from "react"

import { useAppSelector, useAppDispatch } from "store/hooks"
import { fetchPatients, getData } from "features/patients/patientsSlice"

import { Table, Button, Space, Spin } from "antd"
import "antd/dist/antd.css"
import { useHistory } from "react-router"

import { formatDate } from "./utils/formatDate"
import { getCurrentPage } from "./utils/getCurrentPage"

import FloatingButton from "components/PatientsList/FloatingButton/FloatingButton"

import IPatientsData from "models/PatientsModel"
import FilterComponent from "./FilterComponent/FilterComponent"
import PatientsModalRoute from "./PatientsModalRoute/PatientsModalRoute"


const PatientsList = () => {
   const [resetList, setResetList] = useState<IPatientsData[]>([])
   const [patients, setPatients] = useState<IPatientsData[]>([])
   const [currentPatientId, setCurrentPatientId] = useState<string>("")

   const patientsFetch = useAppSelector(getData)
   const dispatch = useAppDispatch()
	const history = useHistory()
   const initialRender = useRef(true)

   const columns = [
      {
         title: "Name",
         dataIndex: "formattedName",
         key: "formattedName",
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
         dataIndex: "birthDate",
         key: "birthDate",
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
      let patientsFiltered = [...resetList]

      patientsFiltered = patientsFiltered.filter((patient) => {
         let lowName = patient.formattedName.toLowerCase()
         let lowSearch = search.toLowerCase()
         return lowName.includes(lowSearch)
      })

      if (patientsFiltered.length > 0) {
         setPatients(patientsFiltered)
      } else {
         alert("There is no patient with the entered name!")
      }
   }

   const filterTablePerGenderHandler = (filter: string) => {
      if (filter !== "both") {
         let patientsFiltered = [...resetList]

         patientsFiltered = patientsFiltered.filter((patient) => {
            let lowName = patient.gender.toLowerCase()
            let lowSearch = filter.toLowerCase()
            return lowName === lowSearch
         })

         setPatients(patientsFiltered)
      } else {
         setPatients(resetList)
      }
   }

   const ResetSearchHandler = () => {
      setPatients(resetList)
   }

   const loadPatientsHandler = useCallback(() => {
      const path = history.location.pathname
      let page = getCurrentPage()
      const id = path.substring(path.lastIndexOf(":") + 1, path.length)

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

         Array.from(Array(Number(page)).keys()).forEach((page, index) => {
            let pageFetch = index + 1
            
            dispatch(fetchPatients({page: pageFetch, isFirstRender: true}))
         })
         initialRender.current = false

      } else {
         let newPage = Number(page) + 1
         history.push(`${process.env.PUBLIC_URL}/page=${newPage}&`)
         dispatch(fetchPatients(({page: Number(newPage), isFirstRender: false})))
      }
   }, [dispatch, history])

   const toggleModalHandler = (id: String | null, open?: boolean) => {
      const page = getCurrentPage()

      if (open === false) {
         history.push(`${process.env.PUBLIC_URL}/page=${page}&`)
      } else {
         // history.push(`${process.env.PUBLIC_URL}${path}id:${id}`) // => Caminho para localhost
         history.push(`${process.env.PUBLIC_URL}/page=${page}&id:${id}`) // => Caminho para servidor online
      }
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

      const page = getCurrentPage()

      updatedPatientsList = updatedPatientsList.map((patient, index) => {
         return {
            ...patient,
            key: patient.name.first+'-'+index,
            id: index + 1,
            url: `${baseURL}/page=${page}&id:${index + 1}`,
            birthDate: formatDate(patient.dob.date),
            formattedName: `${patient.name.title} ${patient.name.first} ${patient.name.last}`
         }
      })

      setPatients(current => [...current, ...updatedPatientsList])
      setResetList((current) => [...current, ...updatedPatientsList])
   }, [patientsFetch.patients, history])
   
   useEffect(() => {
      let id = ""
      let path = history.location.pathname

      if (path.indexOf("id:") !== -1) {
         id = path.substr(path.indexOf(":") + 1)
      }
      
      setCurrentPatientId(id)
   }, [history.location.pathname])


   return (
      <div>         
         {patients.length > 0 &&
            <>
               <FloatingButton />            
               <PatientsModalRoute 
                  page={getCurrentPage()}
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
                     // dataSource={patientsTable}
                     dataSource={patients}
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
            </>}
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