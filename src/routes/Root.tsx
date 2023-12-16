import {useEffect, useState} from 'react'
import './css/Root.css'
import InputFile from '@/components/inputFile/InputFile'
import motVide from '../helpers/motsVides.txt'
import * as d3 from 'd3'
import IndexationService from '@/services/indexation.service'
import {BlockItemType, Indexation} from '@/types/indexation.type'
import DocumentService from '@/services/document.service'
import DenseAppBar from '@/components/appBar'
import {Box, Drawer} from '@mui/material'
import SearchBlocksWrapper from '@/components/block/SearchBlocksWrapper'
import {blockItems} from '@/helpers/constant'
import {arrayMove} from '@dnd-kit/sortable'
import {getLocalStorageItem, setLocalStorageItem} from '@/helpers/functions'
import NavigationMenu from '@/components/NavigationMenu'
import _ from 'lodash'

const drawerWidth = 350

function Root() {
  const [listFile, setListFile] = useState<File[]>([])
  const [stopWords, setStopWords] = useState<string[]>([])
  const [lemmatisation, setLemmatisation] = useState<any>([])
  const initialBlockItemList = getLocalStorageItem(
    'block-result-list',
    blockItems,
  )
  const [blockItemList, setBlockItemList] =
    useState<BlockItemType[]>(initialBlockItemList)
  const [refresh, setRefresh] = useState(false)

  useEffect(() => {
    const fetchStopWords = async () => {
      try {
        const response = await fetch(motVide)
        if (response.ok) {
          const content = await response.text()
          const stopWordsArray = content.split('\n').map(word => word.trim())
          setStopWords(stopWordsArray)
        } else {
          console.error('Failed to fetch stop words')
        }
      } catch (error) {
        console.error('Error fetching stop words:', error)
      }
    }

    fetchStopWords()
  }, [])

  useEffect(() => {
    const fetchLemmatisation = async () => {
      try {
        const response = await d3.csv('../../Lexique380.csv')
        if (!response) {
          throw new Error('Data not found or inaccessible')
        }
        setLemmatisation(response)
      } catch (error) {
        console.error('Error fetching stop words:', error)
      }
    }

    fetchLemmatisation()
  }, [])

  const handleUploadFile = (list: FileList) => {
    const listPush = [...list]

    setListFile(listPush)
  }

  useEffect(() => {
    const processAndAddToDB = async () => {
      try {
        const newRowsToAdd: Indexation[] = []
        if (listFile.length > 0) {
          for (const file of listFile) {
            const fileContents = await readFileAsync(file)
            const fileBase64 = await convertFiletoBase64Async(file)
            const listMots = indexationFile(fileContents)
            await DocumentService.addDoc({
              document: {
                name: file.name,
                content: fileContents,
                urlBase64: fileBase64,
              },
            })
            Object.keys(listMots).forEach(key => {
              newRowsToAdd.push({
                mot: key,
                lemma: findLemmaByMot(key),
                occurrence: listMots[key],
                document: file.name,
              })
            })
          }
        }

        if (newRowsToAdd.length > 0) {
          await IndexationService.addIndex({indexations: newRowsToAdd})
        }
      } catch (error) {
        console.error(error)
      }
    }

    const findLemmaByMot = (mot: string): string => {
      const result = lemmatisation.find((item: any) => item.mot === mot)
      return result ? result.lemma : 'non'
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
    const convertFiletoBase64Async = (file: File) => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.onloadend = () => {
          const base64String = reader.result as string
          resolve(base64String)
        }
        reader.onerror = error => {
          reject(error)
        }
        reader.readAsDataURL(file)
      })
    }

    processAndAddToDB()
    setTimeout(() => setRefresh(!refresh), 5000)
  }, [listFile])

  const indexationFile = (fileContents: any) => {
    const strLowerCase = fileContents.toLowerCase()
    const pattern = /[!'";:\-.,…\]\[\(«»)\n\s]+/g

    const res = strLowerCase.replace(pattern, ' ')
    const table = res
      .split(' ')
      .filter((substr: any) => substr.length > 2 && !stopWords.includes(substr))

    const tableFinal = table.reduce((accumulator: any, currentValue: any) => {
      if (accumulator[currentValue]) accumulator[currentValue]++
      else accumulator[currentValue] = 1
      return accumulator
    }, {})
    return tableFinal
  }

  const handleSetBlockItemList = (activeId: string, overId: string) => {
    setBlockItemList(items => {
      const activeIndex = _.findIndex(
        items,
        (item: BlockItemType) => activeId === item.id,
      )
      const overIndex = _.findIndex(
        items,
        (item: BlockItemType) => overId === item.id,
      )

      const newBlockItemList = arrayMove(items, activeIndex, overIndex)

      setLocalStorageItem('block-result-list', JSON.stringify(newBlockItemList))
      return newBlockItemList
    })
  }
  return (
    <div className='Root'>
      <Box sx={{display: 'flex', width: '100%'}}>
        <DenseAppBar
          title='Indexation'
          position='fixed'
          sx={{zIndex: (theme: any) => theme.zIndex.drawer + 1}}
        />
        <Drawer
          variant='permanent'
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            [`& .MuiDrawer-paper`]: {
              width: drawerWidth,
              boxSizing: 'border-box',
            },
          }}>
          <Box
            sx={{
              paddingLeft: '12px',
              paddingRight: '12px',
              paddingTop: 10,
            }}>
            <InputFile onUpload={handleUploadFile} />
          </Box>
          <Box style={{flex: 1}}>
            <NavigationMenu
              blockItemList={blockItemList}
              handleSetBlockItemList={handleSetBlockItemList}
            />
          </Box>
        </Drawer>
        <Box
          component='main'
          sx={{
            flexGrow: 1,
            paddingLeft: 3,
            paddingRight: 3,
            paddingTop: 10,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: '100%',
          }}>
          <SearchBlocksWrapper
            blockItemList={blockItemList}
            refresh={refresh}
          />
        </Box>
      </Box>
    </div>
  )
}

export default Root
