

import { Controller, FormProvider, useForm } from "react-hook-form";
import '../../Usuarios/Create/UsuariosCreate.css'
import { Box, Button, Dialog, IconButton, MenuItem, TextField, Typography } from "@mui/material";
import { Categoria, ISubCategoria } from "../../../models/Categoria";
import { Add, Close, Delete } from "@mui/icons-material";
import useScreenWidth from "../../../hooks/UseScreenWidth";
import { SnackbarRec } from "../../../components/Snackbar/SnackbarRec";
import { useState } from "react";
import { useCreateSubCategoriaMutation, useDeleteSubCategoriaMutation } from "../../../api/CategoriasRepository";
import { NewSubcategorieDialog } from "./NewSubcategorieDialog";

interface Props {
  onSubmit: (categoria: Categoria) => Promise<any>;
  initialValues: Categoria;
}

export const CategoriasUpdateForm = ({ onSubmit, initialValues }: Props) => {

  const methods = useForm<Categoria>({
    defaultValues: initialValues,
    values: initialValues
  });

  const {
    formState: { isSubmitting },
    setValue, 
    control,
    handleSubmit,
    getValues
  } = methods;

  const [selectedSubcat, setSelectedSubcat] = useState<ISubCategoria | null>(null)

  const [modalDelete, setModalDelete] = useState(false)
  const [snack, setSnack] = useState(false);
  const deleteSubcategoriaMutation = useDeleteSubCategoriaMutation();

  const [modalCreate, setModalCreate] = useState(false);
  const [snackSub, setSnackSub] = useState(false);
  const subcategoriaMutation = useCreateSubCategoriaMutation();
  const handleOnCreateSubcategoria = async (value: string) => {
    await subcategoriaMutation.mutateAsync({
      categoriaId: getValues('_id'),
      subcatName: { name: value }
    });
    setModalCreate(false)
    setSnackSub(true)
  }

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} className='usuarios-create-form'>
        <Controller 
          name='_id'
          control={control}
          render={(field) => (
            <TextField
              {...field}
              fullWidth
              defaultValue={initialValues._id}
              label={'ID'}
              placeholder={'Ingrese el ID'}
              disabled
              InputLabelProps={{ shrink: true }}
              error={!!field.fieldState.error}
              helperText={field.fieldState.error?.message ?? ''}
              onChange={(value) => setValue('_id', value.target.value)}
              sx={{
                '& label.Mui-focused': {
                  color: 'black',
                },
                '& .MuiInput-underline:after': {
                  borderBottomColor: 'antiquewhite',
                },
                '& .MuiOutlinedInput-root': {
                  '&.Mui-focused fieldset': {
                    borderColor: 'antiquewhite',
                  },
                },
              }}
            />
          )}
        />

        <Controller 
          name='name'
          control={control}
          render={(field) => (
            <TextField
              {...field}
              fullWidth
              defaultValue={initialValues.name}
              label={'Nombre'}
              placeholder={'Ingrese el nombre'}
              InputLabelProps={{ shrink: true }}
              error={!!field.fieldState.error}
              helperText={field.fieldState.error?.message ?? ''}
              onChange={(value) => setValue('name', value.target.value)}
              sx={{
                '& label.Mui-focused': {
                  color: 'black',
                },
                '& .MuiInput-underline:after': {
                  borderBottomColor: 'antiquewhite',
                },
                '& .MuiOutlinedInput-root': {
                  '&.Mui-focused fieldset': {
                    borderColor: 'antiquewhite',
                  },
                },
              }}
            />
          )}
        />

        <Box display={'flex'} maxWidth={'800px'} width={'100%'} justifyContent={'space-between'} alignItems={'center'}>
          <Typography fontWeight={'bold'} variant="h6">Sub categorias</Typography>
          <IconButton
            aria-label="close"
            onClick={() => { setModalCreate(true) }}
            color="primary"
            sx={{ 
              color: 'black', 
              backgroundColor: 'antiquewhite', 
              ':hover': {
                backgroundColor: 'antiquewhite', 
              } 
            }} 
          >
            <Add sx={{ color: 'black' }} />
          </IconButton>
        </Box>

        {
          getValues('subCategories').map((x, index) => (
            <Box display={'flex'} flexDirection={'row'}>
              <TextField
                key={x._id}
                fullWidth
                defaultValue={x.name}
                label={'Nombre'}
                placeholder={'Ingrese el nombre'}
                InputLabelProps={{ shrink: true }}
                onChange={(value) => setValue(`subCategories.${index}.name`, value.target.value)}
                sx={{
                  '& label.Mui-focused': {
                    color: 'black',
                  },
                  '& .MuiInput-underline:after': {
                    borderBottomColor: 'antiquewhite',
                  },
                  '& .MuiOutlinedInput-root': {
                    '&.Mui-focused fieldset': {
                      borderColor: 'antiquewhite',
                    },
                  },
                }}
              />
              <MenuItem
                onClick={() => {
                  setSelectedSubcat(x)
                  setModalDelete(true)
                }}
                sx={{ color: 'error.main', marginLeft: '20px' }}
              >
                <Delete />
                Eliminar
              </MenuItem>
            </Box>
          ))
        }

        {
          selectedSubcat !== null && (
            <SubcategoriasBorrarDialog 
              open={modalDelete}
              isSubmitting={deleteSubcategoriaMutation.isPending}
              onClose={() => {
                setSelectedSubcat(null)
                setModalDelete(false);
              }}
              onSubmit={async () => {
                try {
                  await deleteSubcategoriaMutation.mutateAsync({
                    categoria: getValues('_id'),
                    subcategoria: selectedSubcat._id
                  })
                  setSnack(true);
                  setModalDelete(false)
                } catch (error) {
                  console.log('ocurrio un error')
                }
              }}
              subcategoria={selectedSubcat}
            />
          )
        }

        <NewSubcategorieDialog 
          open={modalCreate}
          onClose={() => setModalCreate(false)}
          onSubmit={handleOnCreateSubcategoria}
          isSubmitting={false}
        />

        <SnackbarRec 
          open={snack}
          isError={deleteSubcategoriaMutation.isError}
          message={
            deleteSubcategoriaMutation.isError 
              ? 'Ocurrio un error borrando la sub categoria' 
              : 'Sub categoria borrada con exito'
          }
          onClose={() => setSnack(false)}
        />

        <SnackbarRec 
          open={snackSub}
          isError={subcategoriaMutation.isError}
          message={
            subcategoriaMutation.isError 
              ? 'Ocurrio un error creando la sub categoria' 
              : 'Sub categoria creada con exito'
          }
          onClose={() => setSnackSub(false)}
        />

        <button disabled={isSubmitting} className='button-create-user' type='submit'>
          ACTUALIZAR CATEGORIA
        </button>
      </form>
    </FormProvider>
  )
}



interface PropsSub {
  open: boolean;
  onClose: () => void;
  onSubmit: () => Promise<any>;
  subcategoria: ISubCategoria;
  isSubmitting: boolean;
}

export const SubcategoriasBorrarDialog = ({ open, onClose, onSubmit, subcategoria, isSubmitting }: PropsSub) => {

  const screenWidth = useScreenWidth();
  const isMobile = screenWidth < 900;

  return (
    <Dialog
      open={open}
      fullWidth
      sx={{
        '.MuiDialog-paper': {
          minWidth: isMobile ? '100%' : 650,
          padding: '20px',
        },
      }}
      onClose={onClose}
      scroll="paper"
      fullScreen={isMobile}
    >
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography variant="h6">Borrar subcategoria</Typography>
        <IconButton
          aria-label="close"
          onClick={onClose}
          color="primary"
          sx={{ 
            color: 'black', 
            backgroundColor: 'antiquewhite', 
            ':hover': {
              backgroundColor: 'antiquewhite', 
            } 
          }}
        >
          <Close />
        </IconButton>
      </Box>
      <Box paddingTop={2}>
        <Typography fontSize={20} mb={2} >CONFIRMA QUE DESEA ELIMINAR LA SIGUIENTE SUBCATEGORIA</Typography>
        <Typography color={'grey'} >Nombre: {subcategoria.name}</Typography>
        <Box width={'100%'} display={'flex'} justifyContent={'flex-end'}>
          <Button disabled={isSubmitting} onClick={onSubmit} variant="contained" color="error">
            Eliminar
          </Button>
        </Box>
      </Box>
    </Dialog>
  )
}
