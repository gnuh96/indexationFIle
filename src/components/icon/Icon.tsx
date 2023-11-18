import txt_icon from '@/assets/png/txt-text-file-extension-symbol.png'
import close_icon from '@/assets/png/close.png'
import menu_icon from '@/assets/png/menu.png'
import search from '@/assets/svg/search.svg'
import DragIndicatorOutlinedIcon from '@mui/icons-material/DragIndicatorOutlined'
import file_icon from '../../assets/png/file-icon-blanc.png'
import index from '../../assets/png/list.png'

interface IconPropsType {
  type: string
  containerClass?: string
  containerStyle?: object
  iconClass?: string
  iconStyle?: object
  size?: string
  color?: string
}

export default function Icon({
  type,
  containerClass,
  containerStyle,
  size,
  iconStyle,
}: IconPropsType): JSX.Element {
  const IconMappingObject: Record<string, JSX.Element> = {
    txt_icon: (
      <img
        src={txt_icon}
        alt='icon'
        style={{...iconStyle, height: size, width: size}}
      />
    ),
    close_icon: (
      <img
        src={close_icon}
        alt='icon'
        style={{...iconStyle, height: size, width: size}}
      />
    ),
    menu_icon: (
      <img
        src={menu_icon}
        alt='icon'
        style={{...iconStyle, height: size, width: size}}
      />
    ),
    search: (
      <img
        src={search}
        alt='icon'
        style={{...iconStyle, height: size, width: size}}
      />
    ),
    drag: <DragIndicatorOutlinedIcon sx={iconStyle} />,
    listDoc: <img src={file_icon} alt='icon' />,
    indexation: <img src={index} alt='icon' />,
  }
  return (
    <div
      className={containerClass}
      style={{display: 'flex', ...containerStyle}}>
      {IconMappingObject[type]}
    </div>
  )
}
