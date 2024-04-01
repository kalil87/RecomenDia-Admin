

import { Box, IconButton, Typography } from '@mui/material'
import { useNavigate, useParams } from 'react-router-dom'
import { PATHS } from '../../../routes/paths'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { SnackbarRec } from '../../../components/Snackbar/SnackbarRec';
import { useOneRecomendacionQuery, useUpdateRecomendacionMutation } from '../../../api/RecomendacionesRepository';
import { RecomendacionUpdateForm } from './RecomendacionUpdateForm';
import { Recomendaciones } from '../../../models/Recomendaciones';

export const RecomendacionUpdatePage = () => {

  const navigate = useNavigate()
  let { id } = useParams();
  
  if(!id) {
    navigate(PATHS.dashboard.recomendaciones.root);
  }

  const recomendacionQuery = useOneRecomendacionQuery(id!)
  
  if(recomendacionQuery.isError || recomendacionQuery.data?._id === undefined){
    navigate(PATHS.dashboard.usuarios.root);
  }

  const updateMutation = useUpdateRecomendacionMutation()

  const recomendacion = recomendacionQuery.data;

  return (
    <Box display={'flex'} flexDirection={'column'} alignItems={'center'} width={'100%'}>
      <Box display={'flex'} maxWidth={'800px'} width={'100%'} justifyContent={'space-between'} alignItems={'center'}>
        <Typography fontWeight={'bold'} variant="h6">Actualizar recomendación</Typography>
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
        {
          recomendacionQuery.isLoading
            ? 'Buscando la recomendación...'
            : (
              <RecomendacionUpdateForm 
                onSubmit={ async (recomendacion: Recomendaciones) => {
                  await updateMutation.mutateAsync(recomendacion)
                  navigate(PATHS.dashboard.recomendaciones.root, {state: { update: true }})
                }}
                initialValues={recomendacion!}
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
