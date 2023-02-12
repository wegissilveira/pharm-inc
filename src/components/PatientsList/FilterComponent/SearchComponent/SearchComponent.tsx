import { useState } from "react"

import { Input, Button } from "antd"
const { Search } = Input

type Props = {
   searchCallback: (search: string) => void
   resetSearchCallback: () => void
}

const SearchComponent = (props: Props) => {
   const {
      searchCallback,
      resetSearchCallback
   } = props

   const [inputValue, setInputValue] = useState<string>("")

   const setSearchValue = (e: React.ChangeEvent<HTMLInputElement>) => {
      setInputValue(e.currentTarget.value)
   }

   const onSearch = () => {
      searchCallback(inputValue)
   }

   const cleanInput = () => {
      resetSearchCallback()
      setInputValue("")
   }

   return (
      <>
         <Search
            value={inputValue}
            placeholder="Insert a patient's name"
            onChange={setSearchValue}
            onSearch={onSearch}
            enterButton
            style={{ width: "80%" }}
         />
         <Button
            type="primary"
            style={{ width: "18%", marginLeft: "2%" }}
            onClick={cleanInput}
         >
            Reset
         </Button>
      </>
   )
}

export default SearchComponent