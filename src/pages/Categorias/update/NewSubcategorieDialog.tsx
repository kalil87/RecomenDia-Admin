

import { Box, Button, Dialog, IconButton, TextField, Typography } from "@mui/material";
import useScreenWidth from "../../../hooks/UseScreenWidth";
import Close from '@mui/icons-material/Close'
import { useState } from "react";

interface Props {
  open: boolean;
  onClose: () => void;
  onSubmit: (value: string) => Promise<any>;
  isSubmitting: boolean;
}

export const NewSubcategorieDialog = ({ open, onClose, onSubmit, isSubmitting }: Props) => {

  const screenWidth = useScreenWidth();
  const isMobile = screenWidth < 900;
  const [valueName, setValueName] = useState('');

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
        <Typography variant="h6">Crear sub categoria</Typography>
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
        <TextField
          fullWidth
          label={'Nombre'}
          placeholder={'Ingrese el nombre'}
          InputLabelProps={{ shrink: true }}
          onChange={(value) => setValueName(value.target.value)}
          sx={{
            '& label.Mui-focused': {
              color: 'black',
            },
            '& .MuiInput-underline:after': {
              borderBottomColor: 'antiquewhite',
            },
            '& .MuiOutlinedInput-root': {
              '&.Mui-focused fieldset': {
                borderColor: 'antiquewhite',
              },
            },
          }}
        />
        <Box width={'100%'} mt={'20px'} display={'flex'} justifyContent={'flex-end'}>
          <Button 
            disabled={isSubmitting} 
            onClick={() => onSubmit(valueName)} 
            color="primary"
            sx={{ 
              color: 'black', 
              backgroundColor: 'antiquewhite', 
              ':hover': {
                backgroundColor: 'antiquewhite', 
              } 
            }} 
            variant="contained"
          >
            Crear
          </Button>
        </Box>
      </Box>
    </Dialog>
  )
}
