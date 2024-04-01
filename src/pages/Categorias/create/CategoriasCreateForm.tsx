import { Box, IconButton, MenuItem, TextField, Typography } from '@mui/material';
import '../../Usuarios/Create/UsuariosCreate.css'
import { Controller, FormProvider, useForm } from 'react-hook-form';
import { Add, Delete } from '@mui/icons-material';
import { SnackbarRec } from '../../../components/Snackbar/SnackbarRec';
import { useState } from 'react';

export interface ICreateCategoria {
  name: string;
  subCategories: string[];
}

interface Props {
  onSubmit: (user: ICreateCategoria) => Promise<any>;
}

export const CategoriasCreateForm = ({ onSubmit }: Props) => {

  const methods = useForm<ICreateCategoria>({
    defaultValues: {
      name: '',
      subCategories: [''],
    },
  });

  const {
    formState: { isSubmitting },
    setValue, 
    getValues,
    control,
    handleSubmit
  } = methods;

  const [error, setError] = useState<string | null>(null);

  const validateOnSubmit = async (values: ICreateCategoria) => {

    if(getValues('name').length === 0){
      setError('Complete el nombre para continuar');
      return;
    }
    if(getValues('subCategories').length === 0 || getValues('subCategories')[0] === '') {
      setError('Agregue al menos una categoria');
      return;
    }
    if(getValues('subCategories').filter(x => x.length === 0).length > 0){
      setError('Complete todas las subcategorias para continuar');
      return;
    }

    await onSubmit(values);
  }

  const handleEliminarUltimaSubcategoria = () => {
    // Obtener una copia de las subcategorías actuales
    const subcategoriasActuales = [...getValues('subCategories')];

    // Verificar que haya al menos un elemento antes de eliminar
    if (subcategoriasActuales.length > 0) {
      // Eliminar el último elemento
      subcategoriasActuales.pop();

      // Actualizar el valor en el formulario
      setValue('subCategories', subcategoriasActuales);
    }
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(validateOnSubmit)} className='usuarios-create-form'>
        <Controller 
          name='name'
          control={control}
          render={(field) => (
            <TextField
              {...field}
              fullWidth
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
            onClick={() => {
              setValue('subCategories', [...getValues('subCategories'), ''])
            }}
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
          methods.watch('subCategories').map((x, index) => (
            <Box display={'flex'} flexDirection={'row'}>
              <TextField
                key={index}
                fullWidth
                label={`Sub categoria - ${index + 1}`}
                placeholder={'Ingrese la sub categoria'}
                InputLabelProps={{ shrink: true }}
                onChange={(value) => setValue(`subCategories.${index}`, value.target.value )}
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
              {
                index === (getValues('subCategories').length - 1) && (
                  <MenuItem
                    onClick={handleEliminarUltimaSubcategoria}
                    sx={{ color: 'error.main', marginLeft: '20px' }}
                  >
                    <Delete />
                    Eliminar
                  </MenuItem>
                )
              }
            </Box>
          ))
        }

        <button disabled={isSubmitting} className='button-create-user' type='submit'>
          CREAR CATEGORIA
        </button>
      </form>

      <SnackbarRec 
        open={error !== null} 
        isError={error !== null} 
        message={error ?? ''} 
        onClose={() => { setError(null)}}
      />

    </FormProvider>
  )
}
