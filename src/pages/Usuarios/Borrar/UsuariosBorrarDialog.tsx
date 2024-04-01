import { Box, Button, Dialog, IconButton, Typography } from "@mui/material";
import useScreenWidth from "../../../hooks/UseScreenWidth";
import Close from '@mui/icons-material/Close'
import { Usuario } from "../../../models/Usuarios";

interface Props {
  open: boolean;
  onClose: () => void;
  onSubmit: () => Promise<any>;
  user: Usuario;
  isSubmitting: boolean;
}

export const UsuariosBorrarDialog = ({ open, onClose, onSubmit, user, isSubmitting }: Props) => {

  const screenWidth = useScreenWidth();
  const isMobile = screenWidth < 900;

  return (
    <Dialog
      open={open}
      fullWidth
      sx={{
        '.MuiDialog-paper': {
          minWidth: isMobile ? '100%' : 650,
          padding: '20px',
        },
      }}
      onClose={onClose}
      scroll="paper"
      fullScreen={isMobile}
    >
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography variant="h6">Borrar usuario</Typography>
        <IconButton
          aria-label="close"
          onClick={onClose}
          color="primary"
          sx={{ 
            color: 'black', 
            backgroundColor: 'antiquewhite', 
            ':hover': {
              backgroundColor: 'antiquewhite', 
            } 
          }}
        >
          <Close />
        </IconButton>
      </Box>
      <Box paddingTop={2}>
        <Typography fontSize={20} mb={2} >CONFIRMA QUE DESEA ELIMINAR EL SIGUIENTE USUARIO</Typography>
        <Typography color={'grey'} >Nombre: {user.name}</Typography>
        <Typography color={'grey'} >Correo electrónico: {user.email}</Typography>
        <Typography color={'grey'} >Nacionalidad: {user.nationality}</Typography>
        <Typography color={'grey'} >Verificado: <span style={{ color: user.verificado ? 'green' : 'red' }} >{user.verificado ? 'Si' : 'No'}</span></Typography>
        <Box width={'100%'} display={'flex'} justifyContent={'flex-end'}>
          <Button disabled={isSubmitting} onClick={onSubmit} variant="contained" color="error">
            Eliminar
          </Button>
        </Box>
      </Box>
    </Dialog>
  )
}
