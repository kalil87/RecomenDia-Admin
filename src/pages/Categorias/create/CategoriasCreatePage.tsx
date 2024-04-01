



import { Box, IconButton, Snackbar, Typography } from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';
import { PATHS } from '../../../routes/paths';
import { AxiosError } from 'axios';
import { Fragment, useState } from 'react';
import { Close } from '@mui/icons-material';
import { CategoriasCreateForm, ICreateCategoria } from './CategoriasCreateForm';
import { useCreateCategoriaMutation } from '../../../api/CategoriasRepository';


export const CategoriasCreatePage = () => {

  const navigate = useNavigate();
  const createCategoria = useCreateCategoriaMutation()
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (values: ICreateCategoria) => {
    try {
      await createCategoria.mutateAsync(values)
      navigate(PATHS.dashboard.categorias.root, {state: { creado: true }})
    } catch (error) {
      const err = error as AxiosError
      const message = err.response!.data as {error: string}
      console.log(message.error)
      setError(message.error)
    }
  }

  return (
    <Box display={'flex'} flexDirection={'column'} alignItems={'center'} width={'100%'}>
      <Box display={'flex'} maxWidth={'800px'} width={'100%'} justifyContent={'space-between'} alignItems={'center'}>
        <Typography fontWeight={'bold'} variant="h6">Crear categoria</Typography>
        <IconButton
          aria-label="close"
          onClick={() => navigate(PATHS.dashboard.categorias.root)}
          color="primary"
          sx={{ 
            color: 'black', 
            backgroundColor: 'antiquewhite', 
            ':hover': {
              backgroundColor: 'antiquewhite', 
            } 
          }} 
        >
          <ArrowBackIcon sx={{ color: 'black' }} />
        </IconButton>
      </Box>

      <Box display={'flex'} flexDirection={'column'} width={'100%'} maxWidth={'800px'}>
        <CategoriasCreateForm 
          onSubmit={onSubmit}
        />
      </Box>

      <Snackbar
        anchorOrigin={{
          horizontal: "right",
          vertical: "bottom",
        }}
        open={error !== null}
        autoHideDuration={5000}
        message={error}
        ContentProps={{
          sx: {
            backgroundColor: 'red'
          }
        }}
        onClose={() => setError(null)}
        action={
          <Fragment>
            <IconButton
              onClick={() => setError(null)}
            >
              <Close fontSize="small" sx={{ color: 'white' }} />
            </IconButton>
          </Fragment>
        }
      />

    </Box>
  )
}
