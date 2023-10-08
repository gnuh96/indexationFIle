import Icon from '@/components/icon/Icon'
import './style.css'
import {Typography} from '@mui/joy'

export interface ItemFileProps {
  fileName: string
}

export default function ItemFile({fileName}: ItemFileProps) {
  return (
    <div className='itemFile'>
      <Icon type='txt_icon' size='1.5rem' containerClass='itemFileIcon' />
      <Typography sx={{flex: 5}}>{fileName}</Typography>
      <Icon type='close_icon' size='1.5rem' containerClass='itemFileIcon' />
    </div>
  )
}
