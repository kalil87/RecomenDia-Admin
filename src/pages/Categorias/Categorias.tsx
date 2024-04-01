
import './Categorias.css'
import '../index.css'
import AddIcon from '@mui/icons-material/Add';
import { Button } from '@mui/material'
import { useCategoriasQuery } from '../../api/CategoriasRepository';
import { CategoriasGrid } from './CategoriasGrid';
import { useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { SnackbarRec } from '../../components/Snackbar/SnackbarRec';
import { PATHS } from '../../routes/paths';


export const Categorias = () => {

  const categoriasQuery = useCategoriasQuery()

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
        <h2>Categorias</h2>
        <Button 
          onClick={() => navigate(PATHS.dashboard.categorias.create)}
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
        categoriasQuery.isLoading
          ? 'Cargando categorias...'
          : <CategoriasGrid data={categoriasQuery.data!} />
      }

      <SnackbarRec 
        open={creado}
        message={'Categoria creada con exito'}
        isError={false}
        onClose={() => {
          navigate(PATHS.dashboard.categorias.root, {})
          setCreado(false)
        }}
      />

      <SnackbarRec 
        open={update}
        message={'Categoria actualizada con exito'}
        isError={false}
        onClose={() => {
          navigate(PATHS.dashboard.categorias.root, {})
          setupdate(false)
        }}
      />

    </div>
  )
}
