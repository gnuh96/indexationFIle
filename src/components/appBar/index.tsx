import React, {useState} from 'react'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import {useNavigate} from 'react-router-dom'
import {IconButton, Menu, MenuItem} from '@mui/material'
import Icon from '../icon/Icon'

export default function DenseAppBar(props: any) {
  const {title} = props
  const navigate = useNavigate()

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleMenuClose = () => {
    setAnchorEl(null)
  }
  const handleNavigate = (url: string): void => {
    navigate(url)
    setAnchorEl(null)
  }
  return (
    <Box sx={{}}>
      <AppBar component='nav' {...props}>
        <Toolbar
          variant='dense'
          sx={{
            backgroundColor: '#D0D8E5',
            color: '#324A76',
            display: 'flex',
            justifyContent: 'space-between',
            padding: '10px 0',
          }}>
          <Box sx={{display: 'flex', alignItems: 'center'}}>
            <IconButton
              edge='start'
              color='inherit'
              aria-label='menu'
              sx={{mr: 1}}
              onClick={handleMenuClick}>
              <Icon
                type='menu_icon'
                iconStyle={{height: '17px', width: '17px'}}
              />
            </IconButton>
            <Typography
              variant='h6'
              component='div'
              sx={{display: {xs: 'none', sm: 'block'}}}>
              {title}
            </Typography>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}>
              <Typography
                sx={{
                  fontWeight: 450,
                  fontSize: '20px',
                  padding: '6px 16px',
                  color: '#324A76',
                }}>
                Switch to
              </Typography>
              <MenuItem
                sx={{
                  width: '320px',
                  color: '#324A76',
                }}
                onClick={() => handleNavigate('/')}>
                <div style={{display: 'flex', alignItems: 'center'}}>
                  <Typography variant='subtitle1' sx={{paddingLeft: '16px'}}>
                    Indexation
                  </Typography>
                </div>
              </MenuItem>
              <MenuItem
                sx={{
                  width: '320px',
                  color: '#324A76',
                }}
                onClick={() => handleNavigate('/search')}>
                <div style={{display: 'flex', alignItems: 'center'}}>
                  <Typography variant='subtitle1' sx={{paddingLeft: '16px'}}>
                    Search
                  </Typography>
                </div>
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  )
}
