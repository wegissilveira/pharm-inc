import classes from './FilterComponent.module.css'

import PatientsListFilter from "components/PatientsList/FilterComponent/PatientsListFilter/PatientsListFilter"
import SearchComponent from "./SearchComponent/SearchComponent"

type Props = {
   searchPerGenderCallback: (value: string) => void
   searchCallback: (search: string) => void
   resetSearchCallback: () => void
}

const FilterComponent = (props: Props) => {
   const {
      searchPerGenderCallback,
      searchCallback,
      resetSearchCallback
   } = props

   return (
      <div className={classes['FilterComponent--wrapper']}>
         <SearchComponent
            searchCallback={searchCallback}
            resetSearchCallback={resetSearchCallback}
         />
         <PatientsListFilter
            searchPerGenderCallback={searchPerGenderCallback}
         />
      </div>
   )
}

export default FilterComponent