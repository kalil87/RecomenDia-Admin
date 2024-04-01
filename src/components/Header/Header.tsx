

import { Avatar, Box, IconButton, Tooltip } from '@mui/material'
import './Header.css'
import MenuIcon from '@mui/icons-material/Menu';
import { stringAvatar } from '../../utils/stringAvatar'
import LogoutIcon from '@mui/icons-material/Logout';
import useScreenWidth from '../../hooks/UseScreenWidth';
import { useNavigate } from 'react-router-dom';
import AuthService from '../../hooks/AuthService'
import { PATHS } from '../../routes/paths';

interface Props {
  handleOpen: () => void
}

export const Header = ({handleOpen}: Props) => {

  const screenWidth = useScreenWidth();
  const isMobile = screenWidth < 1100;
  const navigate = useNavigate()

  return (
    <header>

      {
        isMobile ? (
          <IconButton onClick={handleOpen}>
            <MenuIcon />
          </IconButton>
        ) : <div></div>
      }

      <Box display={'flex'}>
        <Tooltip title={'Ignacio Irigoitia'} >
          <Avatar {...stringAvatar('Ignacio Irigoitia')} />
        </Tooltip>
        <Tooltip title={'Cerrar sesión'} >
          <IconButton sx={{ml: 2}} onClick={async () => {
            AuthService.logout();
            navigate(PATHS.auth.root)
          }}>
            <LogoutIcon sx={{ color: 'black', fontSize: '26px' }} />
          </IconButton>
        </Tooltip>
      </Box>
    </header>
  )
}
