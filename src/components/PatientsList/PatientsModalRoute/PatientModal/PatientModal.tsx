import classes from "./PatientsModal.module.css"

import { createPortal } from "react-dom"
import { CloseOutlined } from "@ant-design/icons"

import { formatAddress } from "components/PatientsList/utils/formatAddress"

import IPatientsData from "models/PatientsModel"

interface StateProps {
   currentPatient: IPatientsData
   toggleModal: (id: string | null, open: boolean) => void
}

type Props = StateProps

const closeModalStyle = {
   color: "red",
   fontSize: "2em",
   position: "absolute",
   right: "10px",
   top: "10px",
   cursor: "pointer",
} as const



const PatientsModal = (props: Props) => {
   const { currentPatient, toggleModal } = props

   const {
      picture,
      formattedName,
      email,
      gender,
      birthDate,
      phone,
      nat,
      location,
      id,
      url,
   } = currentPatient

   return createPortal(
      <>
         <div className={classes["Modal-overlay"]} onClick={() => toggleModal(null, false)}></div>
         <div className={classes["Modal-container"]}>
               <CloseOutlined
                  onClick={() => toggleModal(null, false)}
                  style={closeModalStyle}
               />
               <img
                  src={picture.large}
                  alt="Patient"
                  className={classes["Modal-patientImg"]}
               />
               <h1 className={classes["Modal-patientName"]}>{formattedName}</h1>
               <div className={classes["Modal-patientDetails"]}>
                  <p><span>Email: </span>{email}</p>
                  <p><span>Gender: </span>{gender}</p>
                  <p><span>Birth date: </span>{birthDate}</p>
                  <p><span>Phone: </span>{phone}</p>
                  <p><span>Nationality: </span>{nat}</p>
                  <p><span>Address: </span>{formatAddress(location)}</p>
                  <p><span>ID: </span>{id}</p>
                  <p><span>URL: </span>{url}</p>
               </div>
            </div>
      </>,
      document.getElementById("modal_root")!
   )
}

export default PatientsModal
