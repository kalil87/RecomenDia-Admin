

import { List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import CategoryIcon from '@mui/icons-material/Category';
import CardGiftcardIcon from '@mui/icons-material/CardGiftcard';
import GroupIcon from '@mui/icons-material/Group';
import './SideBar.css'
import { useNavigate } from 'react-router-dom';
import { PATHS } from '../../routes/paths';

export const SideBar = () => {

  const navigate = useNavigate()

  const url = document.URL

  return (
    <aside>
      <h1>Recomendia</h1>
      <span>Tu asistente del día a día</span>
      <div className='side-divider' />

      <p>GESTIÓN SECCIONES</p>
      <nav aria-label="main mailbox folders">
        <List>
          <ListItem disablePadding sx={{ backgroundColor: url.includes('usuarios') ? 'rgba(205, 205, 205, 1)' : undefined }} >
            <ListItemButton onClick={() => navigate(PATHS.dashboard.usuarios.root)} >
              <ListItemIcon>
                <GroupIcon />
              </ListItemIcon>
              <ListItemText primary="Usuarios" sx={{ display: 'flex' }} />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding sx={{ backgroundColor: url.includes('recomendaciones') ? 'rgba(205, 205, 205, 1)' : undefined }} >
            <ListItemButton onClick={() => navigate(PATHS.dashboard.recomendaciones.root)} >
              <ListItemIcon>
                <CardGiftcardIcon />
              </ListItemIcon>
              <ListItemText primary="Recomendaciones" sx={{ display: 'flex' }} />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding sx={{ backgroundColor: url.includes('categorias') ? 'rgba(205, 205, 205, 1)' : undefined }}>
            <ListItemButton onClick={() => navigate(PATHS.dashboard.categorias.root)} >
              <ListItemIcon>
                <CategoryIcon />
              </ListItemIcon>
              <ListItemText primary="Categorias" sx={{ display: 'flex' }} />
            </ListItemButton>
          </ListItem>
        </List>
      </nav>
    </aside>
  )
}
