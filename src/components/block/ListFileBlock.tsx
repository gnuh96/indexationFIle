import {useState, useEffect} from 'react'

import './search.css'
import {ResultBlockType} from '@/types/indexation.type'
import SearchResultBlock from './SearchResultBlock'
import ItemFile from '../itemFile/ItemFile'
import DocumentService from '@/services/document.service'

export default function ListFileBlock({
  title,
  id,
  iconType,
  refresh,
}: ResultBlockType): JSX.Element {
  const [listFile, setListFile] = useState<any>([])

  useEffect(() => {
    const fetchListFile = async () => {
      try {
        const list_doc = await DocumentService.getAllDoc()
        console.log(list_doc)
        setListFile(list_doc)
      } catch (error) {
        console.error(error)
      }
    }
    fetchListFile()
  }, [refresh])

  return (
    <SearchResultBlock
      style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
      }}
      title={title}
      iconType={iconType}
      id={id}>
      <div className='listFile'>
        {listFile &&
          listFile.map((file: any, i: any) => (
            <ItemFile key={`item_file_${i}`} fileName={file.name} />
          ))}
      </div>
    </SearchResultBlock>
  )
}
