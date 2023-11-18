import {useEffect, useRef} from 'react'
import './style.css'
import Typography from '@mui/joy/Typography'

export interface InputFileProps {
  onUpload: (list: FileList) => void
}

export default function InputFile({onUpload}: InputFileProps) {
  const fileInputRef = useRef<HTMLInputElement | null>(null)
  const handleButtonClick = () => {
    // if (fileInputRef.current) {
    //   fileInputRef.current.click()
    // }
  }
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = e.target.files
    if (fileList) {
      onUpload(fileList)
    }
  }

  //   useEffect(() => {
  //     if (fileInputRef.current !== null) {
  //         fileInputRef.current.setAttribute('directory', '')
  //       fileInputRef.current.setAttribute('webkitdirectory', '')
  //     }
  //   }, [fileInputRef])
  return (
    <div className='inputFileContainer'>
      <Typography color='neutral' level='h3' noWrap={false} variant='plain'>
        Télécharger les fichiers
      </Typography>
      <div className='inputFileWrapper' onClick={handleButtonClick}>
        <input
          type='file'
          multiple
          onChange={handleFileChange}
          ref={fileInputRef}
        />
      </div>
    </div>
  )
}
