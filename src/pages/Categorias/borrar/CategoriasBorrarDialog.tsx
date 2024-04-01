

import { Box, Button, Dialog, IconButton, Typography } from "@mui/material";
import useScreenWidth from "../../../hooks/UseScreenWidth";
import Close from '@mui/icons-material/Close'
import { Categoria } from "../../../models/Categoria";

interface Props {
  open: boolean;
  onClose: () => void;
  onSubmit: () => Promise<any>;
  categoria: Categoria;
  isSubmitting: boolean;
}

export const CategoriasBorrarDialog = ({ open, onClose, onSubmit, categoria, isSubmitting }: Props) => {

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
        <Typography variant="h6">Borrar categoria</Typography>
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
        <Typography fontSize={20} mb={2} >CONFIRMA QUE DESEA ELIMINAR LA SIGUIENTE CATEGORIA</Typography>
        <Typography color={'grey'} >Nombre: {categoria.name}</Typography>
        <Typography color={'grey'} >Sub categorias: {categoria.subCategories.map(x=> x.name + ' - ')}</Typography>
        <Box width={'100%'} display={'flex'} justifyContent={'flex-end'}>
          <Button disabled={isSubmitting} onClick={onSubmit} variant="contained" color="error">
            Eliminar
          </Button>
        </Box>
      </Box>
    </Dialog>
  )
}
