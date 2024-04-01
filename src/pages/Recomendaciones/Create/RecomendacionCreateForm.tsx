


import * as Yup from 'yup';
import '../../Usuarios/Create/UsuariosCreate.css'
import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, FormProvider, useForm } from 'react-hook-form';
import { MenuItem, TextField } from '@mui/material';
import { ICreateRecomendacion } from '../../../api/RecomendacionesRepository';
import { useCategoriasQuery } from '../../../api/CategoriasRepository';
import AuthService from '../../../hooks/AuthService'
import { useState } from 'react';
import { SnackbarRec } from '../../../components/Snackbar/SnackbarRec';


interface Props {
  onSubmit: (user: ICreateRecomendacion) => Promise<any>;
  initialValues?: ICreateRecomendacion;
  isEdit?: boolean;
}

const validation: Yup.SchemaOf<ICreateRecomendacion> = Yup.object().shape({
  categoria: Yup.string().required('Categoria es requerida'),
  subcategoria: Yup.string().required('Subcategoria es requerida'),
  idUser: Yup.string().required('Id user es requerido'),
  especificaciones: Yup.string().nullable()
});

export const RecomendacionCreateForm = ({ onSubmit, initialValues }: Props) => {

  const methods = useForm<ICreateRecomendacion>({
    resolver: yupResolver(validation),
    defaultValues: {
      categoria: '',
      subcategoria: '',
      especificaciones: '',
      idUser: AuthService.getCurrentUser().id
    },
    values: initialValues
  });

  const {
    formState: { isSubmitting },
    setValue, 
    control,
    handleSubmit
  } = methods;

  const categoriasQuery = useCategoriasQuery();
  const [ message, setMessage ] = useState<string | null>(null)

  if(categoriasQuery.isLoading){
    return <></>
  }

  const categorias = categoriasQuery.data!

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} className='usuarios-create-form'>
        <Controller 
          name='categoria'
          control={control}
          render={(field) => (
            <TextField
              {...field}
              fullWidth
              label={'Categoria'}
              select
              helperText="Ingrese la categoria"
              InputLabelProps={{ shrink: true }}
              error={!!field.fieldState.error}
              onChange={(value) => { setValue('categoria', value.target.value)}}
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
            >
              {categorias.map((option) => (
                <MenuItem key={option._id} value={option._id}>
                  {option.name}
                </MenuItem>
              ))}
            </TextField>
          )}
        />

        {
          methods.watch('categoria').length > 0 && (
            <>
              <Controller 
                name='subcategoria'
                control={control}
                render={(field) => (
                  <TextField
                    {...field}
                    fullWidth
                    label={'Subcategoria'}
                    select
                    helperText="Ingrese la sub categoria"
                    InputLabelProps={{ shrink: true }}
                    error={!!field.fieldState.error}
                    onChange={(value) => { setValue('subcategoria', value.target.value)}}
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
                  >
                    {categorias.filter(x => x._id === methods.getValues('categoria'))[0].subCategories.map((option) => (
                      <MenuItem key={option._id} value={option._id}>
                        {option.name}
                      </MenuItem>
                    ))}
                  </TextField>
                )}
              />
              <Controller 
                name='especificaciones'
                control={control}
                render={(field) => (
                  <TextField
                    {...field}
                    fullWidth
                    label={'Especificación (opcional)'}
                    multiline
                    helperText="Ingrese la especificación"
                    InputLabelProps={{ shrink: true }}
                    error={!!field.fieldState.error}
                    onChange={(value) => { setValue('especificaciones', value.target.value)}}
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
            </>
          )
        }

        <SnackbarRec 
          open={message != null}
          isError={message != null}
          message={message!}
          onClose={() => setMessage(null)}
        />

        <button disabled={isSubmitting} className='button-create-user' type='submit'>
          {isSubmitting ? 'CREANDO RECOMENDACIÓN POR FAVOR NO SALIR DE ESTA PANTALLA' : 'CREAR RECOMENDACIÓN'}
        </button>
      </form>
    </FormProvider>
  )
}
