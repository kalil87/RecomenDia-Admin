import { useRef, useState } from "react";
import { Usuario } from "../../models/Usuarios"
import { Box, IconButton, MenuItem } from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import MenuPopover from "../../components/menu-popover";
import { UsuariosBorrarDialog } from "./Borrar/UsuariosBorrarDialog";
import { useDeleteUsuarioMutation } from "../../api/UsuariosRepository";
import { SnackbarRec } from "../../components/Snackbar/SnackbarRec";
import { useNavigate } from "react-router-dom";
import { PATHS } from "../../routes/paths";



interface Props {
  data: Usuario[]
}

export const UsuariosGrid = ({data}: Props) => {

  const [openPopover, setOpenPopover] = useState<HTMLElement | null>(null);
  const selectedCatRef = useRef<Usuario>();
  const [modalDelete, setModalDelete] = useState(false)
  const deleteMutation = useDeleteUsuarioMutation();
  const [snack, setSnack] = useState(false);
  const navigate = useNavigate()

  const columns: GridColDef[] = [
    {
      field: '_id',
      headerName: 'ID',
      width: 250,
    },
    {
      field: 'name',
      headerName: 'Nombre',
      flex: 1,
    },
    {
      field: 'email',
      headerName: 'Correo',
      flex: 1,
    },
    {
      field: 'nationality',
      headerName: 'Nacionalidad',
      flex: 1,
    },
    {
      field: 'verificado',
      headerName: 'Verificado',
      width: 100,
      renderCell: (params) => (
        <Box 
          sx={{ 
            backgroundColor: params.row.verificado ? 'green' : '#FF0800',
            paddingX: '15px',
            borderRadius: '10px',
            color: 'white',
            fontWeight: 'bold'
          }} 
        >
          {params.row.verificado ? 'Si' : 'No'}
        </Box>
      )
    },
    {
      field: 'action',
      type: 'actions',
      width: 1,
      renderCell: (params) => (
        <>
          <IconButton
            onClick={(e) => {
              selectedCatRef.current = {
                ...params.row
              };

              setOpenPopover(e.currentTarget);
            }}
          >
            <Edit />
          </IconButton>
        </>
      ),
    },
  ];

  return (
    <Box 
      sx={{ 
        height: 540, 
        maxWidth: '100%',
        mt: '20px'
      }}
    >
      <DataGrid
        rows={data}
        columns={columns}
        getRowId={(row) => row._id}
        sx={{
          '.MuiDataGrid-columnHeaderTitle': { 
             fontWeight: 'bold !important',
             overflow: 'visible !important',
             fontSize: '16px'
          }
        }}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 10,
            },
          },
        }}
        pageSizeOptions={[5]}
        disableRowSelectionOnClick
      />


      <MenuPopover
        open={openPopover}
        onClose={() => {
          setOpenPopover(null);
          selectedCatRef.current = undefined;
        }}
        arrow="right-top"
      >
        <MenuItem
          onClick={() => {
            setOpenPopover(null);
            setModalDelete(true);
          }}
          sx={{ color: 'error.main' }}
        >
          <Delete />
          Eliminar
        </MenuItem>

        <MenuItem onClick={() => {
          setOpenPopover(null);
          navigate(PATHS.dashboard.usuarios.update(selectedCatRef.current?._id!));
        }}>
          <Edit />
          Editar
        </MenuItem>
      </MenuPopover>

      {
        selectedCatRef.current && (
          <UsuariosBorrarDialog 
            open={modalDelete}
            isSubmitting={deleteMutation.isPending}
            onClose={() => {
              setOpenPopover(null);
              setModalDelete(false);
              selectedCatRef.current = undefined;
            }}
            onSubmit={async () => {
              try {
                await deleteMutation.mutateAsync(selectedCatRef.current!._id)
                setSnack(true);
                setModalDelete(false)
              } catch (error) {
                console.log('ocurrio un error')
              }
            }}
            user={selectedCatRef.current!}
          />
        )
      }

      <SnackbarRec 
        open={snack}
        isError={deleteMutation.isError}
        message={
          deleteMutation.isError 
            ? 'Ocurrio un error borrando el usuario' 
            : 'Usuario borrado con exito'
        }
        onClose={() => setSnack(false)}
      />

    </Box>
  )
}
