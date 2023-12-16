import {useState, useEffect} from 'react'

import './search.css'
import {ResultBlockType} from '@/types/indexation.type'
import SearchResultBlock from './SearchResultBlock'
import DataGridComponent from '../dataGrid'
import {GridColDef} from '@mui/x-data-grid'
import IndexationService from '@/services/indexation.service'

export default function IndexationBlock({
  title,
  id,
  iconType,
  refresh,
}: ResultBlockType): JSX.Element {
  const [rows, setRows] = useState<any>([])

  useEffect(() => {
    const fetchIndex = async () => {
      try {
        const updatedRows = await IndexationService.getAllIndex()
        setRows(updatedRows)
      } catch (error) {
        console.error(error)
      }
    }
    fetchIndex()
  }, [refresh])

  const cols: GridColDef[] = [
    {field: 'mot', headerName: 'Mot', flex: 1, sortable: false},
    {field: 'lemma', headerName: 'Lemma', flex: 1, sortable: false},
    {field: 'occurrence', headerName: 'Occurrence', flex: 1, sortable: false},
    {
      field: 'document',
      headerName: 'Document',
      flex: 1,
      sortable: false,
    },
  ]
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
      <DataGridComponent
        rows={rows}
        cols={cols}
        maxHeight='80%'
        rowHeight={40}
      />
    </SearchResultBlock>
  )
}
