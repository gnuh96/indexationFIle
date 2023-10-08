import {useEffect, useState} from 'react'
import './App.css'
import InputFile from '@/components/inputFile/InputFile'
import ItemFile from '@/components/itemFile/ItemFile'
import DataGridComponent from '@/components/dataGrid'
import {GridColDef} from '@mui/x-data-grid'
import IndexationService from './services/indexation.service'
import {Indexation} from './types/indexation.type'

function App() {
  const [listFile, setListFile] = useState<File[]>([])
  const [rows, setRows] = useState<any>([])
  const [rowsToAdd, setRowsToAdd] = useState<Indexation[]>([])

  const handleUploadFile = (list: FileList) => {
    const listPush = [...list]
    const newListFile = [...listFile]
    newListFile.push(...listPush)
    setListFile(newListFile)
  }

  const onClickShowIndex = async () => {
    try {
      const updatedRows = await IndexationService.getAllIndex()
      setRows(updatedRows)
    } catch (error) {
      console.error(error)
    }
  }
  useEffect(() => {
    const processAndAddToDB = async () => {
      try {
        const newRowsToAdd: Indexation[] = []
        if (listFile.length > 0) {
          for (const file of listFile) {
            const fileContents = await readFileAsync(file)
            const listMots = indexationFile(fileContents)

            Object.keys(listMots).forEach(key => {
              newRowsToAdd.push({
                mot: key,
                occurrence: listMots[key],
                document: file.name,
              })
            })
          }
        }

        if (newRowsToAdd.length > 0) {
          await IndexationService.addIndex({indexations: newRowsToAdd})
          console.log(newRowsToAdd)
          setRowsToAdd([])
        }
      } catch (error) {
        console.error(error)
      }
    }

    const readFileAsync = (file: File) => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.onload = (event: any) => {
          resolve(event.target.result)
        }
        reader.onerror = error => {
          reject(error)
        }
        reader.readAsText(file)
      })
    }

    processAndAddToDB()
  }, [listFile])

  const indexationFile = (fileContents: any) => {
    const strLowerCase = fileContents.toLowerCase()
    const pattern = /[!'";:\-.,…\]\[\(«»)\n\s]+/g

    const res = strLowerCase.replace(pattern, ' ')
    const table = res.split(' ').filter((substr: any) => substr.length > 2)

    const tableFinal = table.reduce((accumulator: any, currentValue: any) => {
      if (accumulator[currentValue]) accumulator[currentValue]++
      else accumulator[currentValue] = 1
      return accumulator
    }, {})
    return tableFinal
  }

  const cols: GridColDef[] = [
    {field: 'mot', headerName: 'Mot', flex: 1},
    {field: 'occurrence', headerName: 'Occurrence', flex: 1},
    {
      field: 'document',
      headerName: 'Document',
      flex: 1,
    },
  ]
  return (
    <div className='App'>
      <div className='AppUploadFile'>
        <InputFile onUpload={handleUploadFile} />
        <div className='listFile'>
          {listFile &&
            listFile.map((file: File, i) => (
              <ItemFile key={`item_file_${i}`} fileName={file.name} />
            ))}
        </div>
      </div>
      <div className='AppIndexFile'>
        <button onClick={onClickShowIndex}>Show Indexation</button>
        <DataGridComponent
          rows={rows}
          cols={cols}
          maxHeight='80%'
          rowHeight={40}
        />
      </div>
    </div>
  )
}

export default App
