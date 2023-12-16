import {Dispatch, SetStateAction} from 'react'
import './inputSearch.css'
import Icon from '../icon/Icon'
import IndexationService from '@/services/indexation.service'

interface InputSearchProps {
  placeholder: string
  searchValue: string
  setSearchValue: Dispatch<SetStateAction<string>>
  setResults: (results: any[]) => void
  setNoRes: Dispatch<SetStateAction<boolean>>
}

export default function InputSearch({
  placeholder,
  searchValue,
  setSearchValue,
  setResults,
  setNoRes,
}: InputSearchProps) {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value)
    setNoRes(false)
  }

  const onClickButton = async () => {
    if (searchValue === '') {
      setResults([])
    } else {
      const listWord = await IndexationService.getAllIndexByWord(searchValue)
      if (listWord.length === 0) {
        setNoRes(true)
      }
      setResults(listWord)
    }
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
