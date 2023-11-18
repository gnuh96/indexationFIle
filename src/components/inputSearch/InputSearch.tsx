import {Dispatch, SetStateAction} from 'react'
import './inputSearch.css'
import Icon from '../icon/Icon'
import IndexationService from '@/services/indexation.service'

interface InputSearchProps {
  placeholder: string
  searchValue: string
  setSearchValue: Dispatch<SetStateAction<string>>
  setResults: (results: any[]) => void
}

export default function InputSearch({
  placeholder,
  searchValue,
  setSearchValue,
  setResults,
}: InputSearchProps) {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value)

    if (event.target.value === '') {
      setResults([])
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
