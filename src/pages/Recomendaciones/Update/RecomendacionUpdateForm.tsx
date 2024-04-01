

import { Controller, FormProvider, useForm } from "react-hook-form";
import * as Yup from 'yup';
import { yupResolver } from "@hookform/resolvers/yup";
import '../../Usuarios/Create/UsuariosCreate.css'
import { TextField } from "@mui/material";
import { Recomendaciones } from "../../../models/Recomendaciones";
import { useCategoriasQuery } from "../../../api/CategoriasRepository";

interface Props {
  onSubmit: (recomendacion: Recomendaciones) => Promise<any>;
  initialValues: Recomendaciones;
}

const validation: Yup.SchemaOf<Recomendaciones> = Yup.object().shape({
  _id: Yup.string().required('El id es requerido'),
  id: Yup.string().required('El id es requerido'),
  categoriaId: Yup.string().required('La categoria es requerida'),
  subcategoriaId: Yup.string().required('La subcategoria es requerida'),
  message: Yup.string().required('La recomendacion es requerida'),
  idUser: Yup.string().required('El usuario es requerido'),
});

export const RecomendacionUpdateForm = ({ onSubmit, initialValues }: Props) => {

  const categoriasQuery = useCategoriasQuery()

  const methods = useForm<Recomendaciones>({
    resolver: yupResolver(validation),
    defaultValues: initialValues,
    values: initialValues
  });

  const {
    formState: { isSubmitting },
    setValue, 
    control,
    handleSubmit,
  } = methods;

  if(categoriasQuery.isLoading){
    return <></>;
  }

  const getCategoriaName = (id: string) => {
    return categoriasQuery.data!.filter(x => x._id === id)[0].name
  }

  const subCategoriaName = (idCat: string, idSub: string) => {
    return categoriasQuery.data!.filter(x => x._id === idCat)[0].subCategories.filter(x => x._id === idSub)[0].name
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
          name='categoriaId'
          control={control}
          render={(field) => (
            <TextField
              {...field}
              fullWidth
              defaultValue={getCategoriaName(initialValues.categoriaId)}
              label={'Categoria'}
              placeholder={'Categoria'}
              disabled
              InputLabelProps={{ shrink: true }}
              error={!!field.fieldState.error}
              helperText={field.fieldState.error?.message ?? ''}
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
          name='subcategoriaId'
          control={control}
          render={(field) => (
            <TextField
              {...field}
              fullWidth
              defaultValue={subCategoriaName(initialValues.categoriaId, initialValues.subcategoriaId)}
              label={'Subcategoria'}
              placeholder={'Sub categoria'}
              disabled
              InputLabelProps={{ shrink: true }}
              error={!!field.fieldState.error}
              helperText={field.fieldState.error?.message ?? ''}
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
          name='message'
          control={control}
          render={(field) => (
            <TextField
              {...field}
              fullWidth
              multiline
              defaultValue={initialValues.message}
              label={'Nombre'}
              placeholder={'Ingrese el nombre'}
              InputLabelProps={{ shrink: true }}
              error={!!field.fieldState.error}
              helperText={field.fieldState.error?.message ?? ''}
              onChange={(value) => setValue('message', value.target.value)}
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

        <button disabled={isSubmitting} className='button-create-user' type='submit'>
          ACTUALIZAR RECOMENDACION
        </button>
      </form>
    </FormProvider>
  )
}
