import { Route } from "react-router"
import IPatientsData from "models/PatientsModel"
import PatientsModal from "./PatientModal/PatientModal"

type Props = {
   page: number | string
   currentPatientId: string
   patients: IPatientsData[]
   toggleModalHandler: (id: string | null, open?: boolean) => void
}

const PatientsModalRoute = (props: Props) => {
   const  {
      page,
      currentPatientId,
      patients,
      toggleModalHandler
   } = props

   return (
      <Route
         path={`${process.env.PUBLIC_URL}/page=${page}&id:${currentPatientId}`}
         render={() => {
            return (
               <PatientsModal
                  currentPatient={
                     patients[Number(currentPatientId) - 1]
                  }
                  toggleModal={toggleModalHandler}
               />
            )
         }}
      />
   )
}

export default PatientsModalRoute