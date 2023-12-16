import Icon from '@/components/icon/Icon'
import './style.css'
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord'
import ReactWordcloud from 'react-wordcloud'
import {Box, Modal, Typography} from '@mui/material'
import {useState} from 'react'
import IndexationService from '@/services/indexation.service'
import DocumentService from '@/services/document.service'

const style1 = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '1px solid #CCCCCC',
  borderRadius: 2,
  p: 4,
}

const style2 = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  height: 600,
  overflow: 'scroll',
  bgcolor: 'background.paper',
  border: '1px solid #CCCCCC',
  p: 4,
  borderRadius: 2,
}
export interface ItemFileProps {
  fileName: string
}

export default function ItemFile({fileName}: ItemFileProps) {
  const [open, setOpen] = useState(false)
  const [openModal, setOpenModal] = useState<boolean>(false)
  const [mots, setMots] = useState([])
  const [contentDoc, setContentDoc] = useState<any>()

  const fetchMots = async () => {
    const response = await IndexationService.getAllIndexByDoc(fileName)
    const words = response.map((ele: any) => {
      const word = {text: ele.mot, value: ele.occurrence}
      return word
    })
    const sortedWords = words.sort((a: any, b: any) => b.value - a.value)
    setMots(sortedWords)
  }

  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)
  const onCLickCloud = () => {
    if (mots.length === 0) {
      fetchMots()
    }
    handleOpen()
  }

  const handleCLickItem = async () => {
    const res = await DocumentService.getDocByName(fileName)
    setContentDoc(res.content)
    setOpenModal(true)
  }

  return (
    <div className='itemFile'>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'>
        <Box sx={style1}>
          <Typography id='modal-modal-title' variant='h6' component='h2'>
            Nuage de mots
          </Typography>
          <ReactWordcloud
            words={mots}
            // maxWords={20}
            options={{
              enableTooltip: true,
              deterministic: false,
              // fontFamily: 'Rubik',
              fontSizes: [20, 50],
              fontStyle: 'normal',
              fontWeight: 'normal',
              padding: 1,
              rotations: 3,
              rotationAngles: [0, 0],
              scale: 'sqrt',
              spiral: 'archimedean',
              transitionDuration: -1,
            }}
          />
        </Box>
      </Modal>
      <Modal open={openModal} onClose={() => setOpenModal(false)}>
        <Box sx={style2}>
          <div style={{padding: '0 10'}}>
            <Typography>{contentDoc}</Typography>
          </div>
        </Box>
      </Modal>
      <div className='itemFileContenu' onClick={handleCLickItem}>
        <Icon type='txt_icon' size='1.5rem' containerClass='itemFileIcon' />
        <Typography sx={{flex: 5}}>{fileName}</Typography>
      </div>
      <button onClick={onCLickCloud}>
        <FiberManualRecordIcon />
      </button>
    </div>
  )
}
