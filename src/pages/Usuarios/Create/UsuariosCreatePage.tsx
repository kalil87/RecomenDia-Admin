

import { Box, IconButton, Snackbar, Typography } from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';
import { PATHS } from '../../../routes/paths';
import { ICreateUsuario, UsuariosCreateForm } from './UsuariosCreateForm';
import { useCreateUsuarioMutation } from '../../../api/UsuariosRepository';
import { AxiosError } from 'axios';
import { Fragment, useState } from 'react';
import { Close } from '@mui/icons-material';


export const UsuariosCreatePage = () => {

  const navigate = useNavigate();
  const registerMutation = useCreateUsuarioMutation()
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (values: ICreateUsuario) => {
    try {
      await registerMutation.mutateAsync(values)
      navigate(PATHS.dashboard.usuarios.root, {state: { creado: true }})
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
        <Typography fontWeight={'bold'} variant="h6">Crear usuario</Typography>
        <IconButton
          aria-label="close"
          onClick={() => navigate(PATHS.dashboard.usuarios.root)}
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
        <UsuariosCreateForm 
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
