


import { Box, IconButton, Typography } from '@mui/material'
import { useNavigate, useParams } from 'react-router-dom'
import { PATHS } from '../../../routes/paths'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { SnackbarRec } from '../../../components/Snackbar/SnackbarRec';
import { useOneCategoriaQuery, useUpdateCategoriaMutation } from '../../../api/CategoriasRepository';
import { CategoriasUpdateForm } from './CategoriasUpdateForm';
import { Categoria } from '../../../models/Categoria';

export const CategoriasUpdatePage = () => {

  const navigate = useNavigate()
  let { id } = useParams();
  
  if(!id) {
    navigate(PATHS.dashboard.categorias.root);
  }

  const categoriaQuery = useOneCategoriaQuery(id!)
  
  if(categoriaQuery.isError || categoriaQuery.data?._id === undefined){
    navigate(PATHS.dashboard.categorias.root);
  }

  const updateMutation = useUpdateCategoriaMutation()

  const categoria = categoriaQuery.data;

  return (
    <Box display={'flex'} flexDirection={'column'} alignItems={'center'} width={'100%'}>
      <Box display={'flex'} maxWidth={'800px'} width={'100%'} justifyContent={'space-between'} alignItems={'center'}>
        <Typography fontWeight={'bold'} variant="h6">Actualizar categoria</Typography>
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
        {
          categoriaQuery.isLoading
            ? 'Buscando la categoria...'
            : (
              
              <CategoriasUpdateForm 
                onSubmit={ async (categoria: Categoria) => {
                  await updateMutation.mutateAsync(categoria)
                  navigate(PATHS.dashboard.categorias.root, {state: { update: true }})
                }}
                initialValues={categoria!}
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
