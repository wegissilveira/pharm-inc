import { useState } from "react"

import classes from "./PatientsListFilter.module.css"

import { Radio } from "antd"
import "antd/dist/antd.css"

interface StateProps {
   searchPerGenderCallback: (value: string) => void
}

type Props = StateProps

const PatientsListFilter = (props: Props) => {
	const { searchPerGenderCallback } = props

   const [size, setSize] = useState("both")

   const handleSizeChange = (e: any) => {
      setSize(e.target.value)
      searchPerGenderCallback(e.target.value)
   }

   return (
      <div className={classes["Filter-container"]}>
			<Radio.Group value={size} onChange={handleSizeChange}>
				<Radio.Button value="both">Both</Radio.Button>
				<Radio.Button value="female">Female</Radio.Button>
				<Radio.Button value="male">Male</Radio.Button>
			</Radio.Group>
      </div>
   )
}

export default PatientsListFilter
