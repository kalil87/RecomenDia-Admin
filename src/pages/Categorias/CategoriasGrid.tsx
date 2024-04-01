
import './Categorias.css'
import { Box, IconButton, MenuItem, Typography } from '@mui/material'
import { DataGrid, GridColDef } from '@mui/x-data-grid'
import { Categoria, ISubCategoria } from '../../models/Categoria';
import { Delete, Edit } from '@mui/icons-material';
import { useRef, useState } from 'react';
import MenuPopover from '../../components/menu-popover';
import { CATEGORIAS_COLORS } from '../../config';
import { useNavigate } from 'react-router-dom';
import { PATHS } from '../../routes/paths';
import { CategoriasBorrarDialog } from './borrar/CategoriasBorrarDialog';
import { useDeleteCategoriaMutation } from '../../api/CategoriasRepository';
import { SnackbarRec } from '../../components/Snackbar/SnackbarRec';


interface Props {
  data: Categoria[]
}

export const CategoriasGrid = ({ data }: Props) => {

  const [openPopover, setOpenPopover] = useState<HTMLElement | null>(null);
  const selectedCatRef = useRef<Categoria>();
  const [modalDelete, setModalDelete] = useState(false);
  const deleteMutation = useDeleteCategoriaMutation();
  const [snack, setSnack] = useState(false);
  const navigate = useNavigate()

  const columns: GridColDef[] = [
    {
      field: 'name',
      headerName: 'Nombre',
      width: 150,
      renderCell: (params) => (
        <Box 
          sx={{ backgroundColor: CATEGORIAS_COLORS[params.api.getRowIndexRelativeToVisibleRows(params.id)] }} 
          px={'10px'} 
          py={'2px'} 
          borderRadius={'20px'} 
        >
          {params.row.name}
        </Box>
      )
    },
    {
      field: 'subCategories',
      headerName: 'Subcategorias',
      flex: 1,
      renderCell: (params) => (
        <Box sx={{ display: 'flex', gap: '3px' }} flexDirection="row">
          {params.row.subCategories.map((x: ISubCategoria, index: number) => (
            <Typography
              key={x._id}
              color='success'
              fontSize={13}
            >
              {x.name} { (params.row.subCategories.length - 1 === index) ? '' : ' - ' }
            </Typography>
          ))}
        </Box>
      ),
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
        height: 422, 
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
          navigate(PATHS.dashboard.categorias.update(selectedCatRef.current?._id!));
        }}>
          <Edit />
          Editar
        </MenuItem>
      </MenuPopover>

      {
        selectedCatRef.current && (
          <CategoriasBorrarDialog 
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
            categoria={selectedCatRef.current!}
          />
        )
      }

      <SnackbarRec 
        open={snack}
        isError={deleteMutation.isError}
        message={
          deleteMutation.isError 
            ? 'Ocurrio un error borrando la categoria' 
            : 'Categoria borrada con exito'
        }
        onClose={() => setSnack(false)}
      />

    </Box>
  )
}
