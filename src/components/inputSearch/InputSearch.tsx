import {Dispatch, SetStateAction} from 'react'
import './inputSearch.css'
import Icon from '../icon/Icon'
import IndexationService from '@/services/indexation.service'

interface InputSearchProps {
  placeholder: string
  searchValue: string
  setSearchValue: Dispatch<SetStateAction<string>>
  setResults: (results: any[]) => void
  minInputLength?: number
}

export default function InputSearch({
  placeholder,
  searchValue,
  setSearchValue,
  setResults,
  minInputLength = 2,
}: InputSearchProps) {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value)

    if (event.target.value === '') {
      setResults([])
    }

    if (event.target.value.length >= minInputLength) {
      // if (filterFn) {
      //   filterFn(event.target.value)
      // } else if (searchKey) {
      //   const results = filterList(initialList, searchKey, event.target.value)
      //   setResults(results)
      // }
    }
  }

  const onClickButton = async () => {
    const listWord = await IndexationService.getAllIndexByWord(searchValue)
    setResults(listWord)
  }

  return (
    <div className='inputSearchContainer'>
      <div className='inputSearchWrapper'>
        <input
          type='text'
          value={searchValue}
          onChange={handleChange}
          placeholder={placeholder}
        />
        <Icon type='search' size='2rem' />
      </div>
      <div className='submitButton'>
        <button onClick={onClickButton}>
          <span>Submit</span>
        </button>
      </div>
    </div>
  )
}
