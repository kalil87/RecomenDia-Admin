

import { Box, IconButton, Typography } from '@mui/material'
import { useNavigate, useParams } from 'react-router-dom'
import { PATHS } from '../../../routes/paths'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { SnackbarRec } from '../../../components/Snackbar/SnackbarRec';
import { useOneUsuariosQuery, useUpdateUsuarioMutation } from '../../../api/UsuariosRepository';
import { UsuariosUpdateForm } from './UsuariosUpdateForm';
import { Usuario } from '../../../models/Usuarios';

export const UsuariosUpdatePage = () => {

  const navigate = useNavigate()
  let { id } = useParams();
  
  if(!id) {
    navigate(PATHS.dashboard.usuarios.root);
  }

  const userQuery = useOneUsuariosQuery(id!)
  
  if(userQuery.isError || userQuery.data?._id === undefined){
    navigate(PATHS.dashboard.usuarios.root);
  }

  const updateMutation = useUpdateUsuarioMutation()

  const user = userQuery.data;

  return (
    <Box display={'flex'} flexDirection={'column'} alignItems={'center'} width={'100%'}>
      <Box display={'flex'} maxWidth={'800px'} width={'100%'} justifyContent={'space-between'} alignItems={'center'}>
        <Typography fontWeight={'bold'} variant="h6">Actualizar usuario</Typography>
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
        {
          userQuery.isLoading
            ? 'Buscando al usuario...'
            : (
              <UsuariosUpdateForm 
                onSubmit={ async (user: Usuario) => {
                  await updateMutation.mutateAsync(user)
                  navigate(PATHS.dashboard.usuarios.root, {state: { update: true }})
                }}
                initialValues={user!}
              />
            )
        }
      </Box>

      <SnackbarRec 
        open={false}
        message=''
        isError={false}
        onClose={() => {}}
      />
    </Box>
  )
}
