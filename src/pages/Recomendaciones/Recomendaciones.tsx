

import { Button } from '@mui/material'
import '../index.css'
import AddIcon from '@mui/icons-material/Add';
import { useRecomendacionesQuery } from '../../api/RecomendacionesRepository';
import { RecomendacionesGrid } from './RecomendacionesGrid';
import { useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { PATHS } from '../../routes/paths';
import { SnackbarRec } from '../../components/Snackbar/SnackbarRec';

export const Recomendaciones = () => {

  const recomendacionesQuery = useRecomendacionesQuery()

  const navigate = useNavigate()

  const { state } = useLocation();

  const [creado, setCreado] = useState(false)
  if(state && state.creado && !creado){
    setCreado(true)
  }

  const [update, setupdate] = useState(false)
  if(state && state.update && !update){
    setupdate(true)
  }

  return (
    <div className='page-component'>
      <div className='row-space-bet'>
        <h2>Recomendaciones</h2>
        <Button
          onClick={() => navigate(PATHS.dashboard.recomendaciones.create)}
          sx={{ 
            color: 'black', 
            backgroundColor: 'antiquewhite', 
            ':hover': {
              backgroundColor: 'antiquewhite', 
            } 
          }} 
          variant="contained" 
          startIcon={<AddIcon sx={{ color: 'black' }} />
        }>
          Agregar
        </Button>
      </div>

      {
        recomendacionesQuery.isLoading
          ? 'Cargando recomendaciones...'
          : <RecomendacionesGrid data={recomendacionesQuery.data!} />
      }

      <SnackbarRec 
        open={creado}
        message={'Recomendación creada con exito'}
        isError={false}
        onClose={() => {
          navigate(PATHS.dashboard.recomendaciones.root, {})
          setCreado(false)
        }}
      />

      <SnackbarRec 
        open={update}
        message={'Recomendación actualizada con exito'}
        isError={false}
        onClose={() => {
          navigate(PATHS.dashboard.recomendaciones.root, {})
          setupdate(false)
        }}
      />

    </div>
  )
}
