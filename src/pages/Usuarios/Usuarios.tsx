import { Button } from "@mui/material"
import { useUsuariosQuery } from "../../api/UsuariosRepository"


import '../index.css'
import AddIcon from '@mui/icons-material/Add';
import { UsuariosGrid } from "./UsuariosGrid";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { PATHS } from "../../routes/paths";
import { SnackbarRec } from "../../components/Snackbar/SnackbarRec";

export const Usuarios = () => {

  const usuariosQuery = useUsuariosQuery()
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
        <h2>Usuarios</h2>
        <Button
          onClick={() => navigate(PATHS.dashboard.usuarios.create)}
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
        usuariosQuery.isLoading
          ? 'Cargando usuarios...'
          : <UsuariosGrid data={usuariosQuery.data!} />
      }

      <SnackbarRec 
        open={creado}
        message={'Usuario creado con exito'}
        isError={false}
        onClose={() => {
          navigate(PATHS.dashboard.usuarios.root, {})
          setCreado(false)
        }}
      />

      <SnackbarRec 
        open={update}
        message={'Usuario actualizado con exito'}
        isError={false}
        onClose={() => {
          navigate(PATHS.dashboard.usuarios.root, {})
          setupdate(false)
        }}
      />

      

    </div>
  )
}
