import {useState} from 'react'
import './css/Search.css'
import DenseAppBar from '@/components/appBar'
import InputSearch from '@/components/inputSearch/InputSearch'
import ItemFile from '@/components/itemFile/ItemFile'

function Search() {
  const [searchInputvalue, setSearchInputvalue] = useState<string>('')
  const [filteredWordList, setFilteredWordList] = useState<any>([])
  const [noRes, setNoRes] = useState(false)

  return (
    <div className='Search'>
      <DenseAppBar
        title='Search'
        position='fixed'
        sx={{zIndex: (theme: any) => theme.zIndex.drawer + 1}}
      />
      <div className='blockSearch'>
        <InputSearch
          placeholder='Entrer un mot'
          searchValue={searchInputvalue}
          setSearchValue={setSearchInputvalue}
          setResults={setFilteredWordList}
          setNoRes={setNoRes}
        />
      </div>
      {noRes && (
        <span
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>{`Il n'y a pas de ce mot dans l'indexation`}</span>
      )}
      <div className='listFile'>
        {filteredWordList &&
          filteredWordList.map((ele: any, i: any) => (
            <ItemFile key={`item_file_${i}`} fileName={ele.document} />
          ))}
      </div>
    </div>
  )
}

export default Search
