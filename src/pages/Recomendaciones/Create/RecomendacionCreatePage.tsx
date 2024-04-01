



import { Box, IconButton, Snackbar, Typography } from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';
import { PATHS } from '../../../routes/paths';
import { AxiosError } from 'axios';
import { Fragment, useState } from 'react';
import { Close } from '@mui/icons-material';
import { ICreateRecomendacion, useCreateRecomendacionMutation } from '../../../api/RecomendacionesRepository';
import { RecomendacionCreateForm } from './RecomendacionCreateForm';


export const RecomendacionCreatePage = () => {

  const navigate = useNavigate();
  const recomendacionMutation = useCreateRecomendacionMutation()
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (values: ICreateRecomendacion) => {
    try {
      await recomendacionMutation.mutateAsync(values)
      navigate(PATHS.dashboard.recomendaciones.root, {state: { creado: true }})
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
        <Typography fontWeight={'bold'} variant="h6">Crear recomendacion</Typography>
        <IconButton
          aria-label="close"
          onClick={() => navigate(PATHS.dashboard.recomendaciones.root)}
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
        <RecomendacionCreateForm 
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
