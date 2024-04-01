

import { Box, Button, Dialog, IconButton, Typography } from "@mui/material";
import useScreenWidth from "../../../hooks/UseScreenWidth";
import Close from '@mui/icons-material/Close'
import { Recomendaciones } from "../../../models/Recomendaciones";

interface Props {
  open: boolean;
  onClose: () => void;
  onSubmit: () => Promise<any>;
  recomendacion: Recomendaciones;
  categoria: string;
  subcategoria: string;
  isSubmitting: boolean;
}

export const RecomendacionesBorrarDialog = ({ 
  open, 
  onClose, 
  onSubmit, 
  recomendacion, 
  isSubmitting,
  categoria,
  subcategoria
}: Props) => {

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
        <Typography variant="h6">Borrar recomendacion</Typography>
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
        <Typography fontSize={20} mb={2} >CONFIRMA QUE DESEA ELIMINAR LA SIGUIENTE RECOMENDACION</Typography>
        <Typography color={'grey'} >Categoria: {categoria}</Typography>
        <Typography color={'grey'} >Sub categoria: {subcategoria}</Typography>
        <Typography mt={1} mb={2} fontSize={'13px'} color={'grey'} >Recomendacion: {recomendacion.message}</Typography>
        <Box width={'100%'} display={'flex'} justifyContent={'flex-end'}>
          <Button disabled={isSubmitting} onClick={onSubmit} variant="contained" color="error">
            Eliminar
          </Button>
        </Box>
      </Box>
    </Dialog>
  )
}
