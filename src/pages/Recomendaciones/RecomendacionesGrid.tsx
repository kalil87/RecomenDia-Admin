import { useRef, useState } from "react";
import { Recomendaciones } from "../../models/Recomendaciones";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Box, IconButton, MenuItem } from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";
import MenuPopover from "../../components/menu-popover";
import { useCategoriasQuery } from "../../api/CategoriasRepository";
import { SnackbarRec } from "../../components/Snackbar/SnackbarRec";
import { useDeleteRecomendacionMutation } from "../../api/RecomendacionesRepository";
import { RecomendacionesBorrarDialog } from "./Borrar/RecomendacionesBorrarDialog";
import { useNavigate } from "react-router-dom";
import { PATHS } from "../../routes/paths";




interface Props {
  data: Recomendaciones[]
}

export const RecomendacionesGrid = ({data}: Props) => {
  const [openPopover, setOpenPopover] = useState<HTMLElement | null>(null);
  const selectedCatRef = useRef<Recomendaciones>();
  const categoriasQuery = useCategoriasQuery()
  const [modalDelete, setModalDelete] = useState(false)
  const deleteMutation = useDeleteRecomendacionMutation();
  const [snack, setSnack] = useState(false);
  const navigate = useNavigate()

  if(categoriasQuery.isLoading){
    return <></>;
  }

  const getCategoriaName = (id: string) => {
    return categoriasQuery.data!.filter(x => x._id === id)[0].name
  }

  const subCategoriaName = (idCat: string, idSub: string) => {
    return categoriasQuery.data!.filter(x => x._id === idCat)[0].subCategories.filter(x => x._id === idSub)[0].name
  }

  const columns: GridColDef[] = [
    {
      field: 'categoriaId',
      headerName: 'Categoria',
      width: 110,
      renderCell: (params) => (
        <Box 
          sx={{ backgroundColor: '#FFAEBC' }} 
          px={'10px'} 
          py={'2px'} 
          borderRadius={'20px'} 
        >
          {getCategoriaName(params.row.categoriaId)}
        </Box>
      )
    },
    {
      field: 'subcategoriaId',
      headerName: 'Subcategoria',
      width: 300,
      renderCell: (params) => (
        <Box 
          sx={{ backgroundColor: '#B4F8C8' }} 
          px={'10px'} 
          py={'2px'} 
          borderRadius={'20px'} 
        >
          {subCategoriaName(params.row.categoriaId, params.row.subcategoriaId)}
        </Box>
      )
    },
    {
      field: 'idUser',
      headerName: 'ID user',
      flex: 1
    },
    {
      field: 'message',
      headerName: 'Recomendación',
      flex: 2
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
          navigate(PATHS.dashboard.recomendaciones.update(selectedCatRef.current?._id!));
        }}>
          <Edit />
          Editar
        </MenuItem>
      </MenuPopover>

      {
        selectedCatRef.current && (
          <RecomendacionesBorrarDialog
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
            recomendacion={selectedCatRef.current!}
            categoria={getCategoriaName(selectedCatRef.current.categoriaId)}
            subcategoria={subCategoriaName(selectedCatRef.current.categoriaId, selectedCatRef.current.subcategoriaId)}
          />
        )
      }


      <SnackbarRec 
        open={snack}
        isError={deleteMutation.isError}
        message={
          deleteMutation.isError 
            ? 'Ocurrio un error borrando la recomendación' 
            : 'Recomendación borrada con exito'
        }
        onClose={() => setSnack(false)}
      />
    </Box>
  )
}
