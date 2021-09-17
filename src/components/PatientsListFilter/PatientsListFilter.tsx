import React from 'react'

import classes from './PatientsListFilter.module.css'

import { Input, Button, Radio  } from 'antd'
import 'antd/dist/antd.css'


interface StateProps {
    searchCallback: (value: string) => void,
    searchPerGenderCallback: (value: string) => void
    resetSearchCallback: () => void,
}

type Props = StateProps 

const { Search } = Input


const PatientsListFilter: React.FC<Props> = props => {
    
    let [inputValue, setInputValue] = React.useState<string>('')
    const [size, setSize] = React.useState('both')

    const setSearchValue = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.currentTarget.value)
    }

    const onSearch = () => {
        props.searchCallback(inputValue)
    }

    const handleSizeChange = (e: any) => {
        setSize(e.target.value)
        props.searchPerGenderCallback(e.target.value)
    }

    const cleanInput = () => {
        props.resetSearchCallback()
        setInputValue('')
    }


    return (
        <div className={classes['Filter-container']}>
            <div>
                <Search 
                    value={inputValue}
                    placeholder="Insert a patient's name" 
                    onChange={setSearchValue}
                    onSearch={onSearch} 
                    enterButton 
                    style={{width: '80%'}}
                />
                <Button 
                    type="primary"
                    style={{width: '18%', marginLeft: '2%'}}
                    onClick={cleanInput}
                >Reset
                </Button>
            </div>
            <br />
            <div>
                <Radio.Group value={size} onChange={handleSizeChange}>
                    <Radio.Button value="both">Both</Radio.Button>
                    <Radio.Button value="female">Female</Radio.Button>
                    <Radio.Button value="male">Male</Radio.Button>
                </Radio.Group>
            </div>
        </div>
    )
}

export default PatientsListFilter
