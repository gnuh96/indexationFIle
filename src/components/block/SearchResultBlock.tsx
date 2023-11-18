import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Icon from '../icon/Icon'

export default function SearchResultBlock({
  title,
  children,
  iconType,
  id,
  ...other
}: any) {
  return (
    <Box
      sx={{
        paddingBottom: 1,
        marginBottom: 4,
        backgroundColor: 'white',
        borderRadius: '5px',
        boxShadow: ' 0px 8px 16px 0px rgba(0, 0, 0, 0.1)',
        width: '90%',
        position: 'relative',
      }}>
      <div id={id} style={{position: 'absolute', top: '-4rem'}}></div>
      <Toolbar
        disableGutters
        variant='dense'
        sx={{
          paddingLeft: 1,
          paddingRight: 1,
          paddingTop: 2,
          paddingBottom: 2,
          backgroundColor: '#124376',
          color: '#FFFFFF',
          borderRadius: '5px 5px 0px 0px',
        }}>
        <Icon
          type={iconType}
          containerStyle={{margin: '0px 40px', height: '40px', width: '40px'}}
        />
        <Typography
          variant='h6'
          component='div'
          sx={{
            flexGrow: 1,
            textTransform: 'uppercase',
          }}>
          {title}
        </Typography>
      </Toolbar>
      <Box
        sx={{
          paddingTop: 1,
          paddingLeft: 1,
          paddingRight: 1,
        }}
        {...other}>
        {children}
      </Box>
    </Box>
  )
}
