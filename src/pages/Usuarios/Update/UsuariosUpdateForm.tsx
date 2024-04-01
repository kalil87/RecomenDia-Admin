import { Controller, FormProvider, useForm } from "react-hook-form";
import { Usuario } from "../../../models/Usuarios";
import * as Yup from 'yup';
import { yupResolver } from "@hookform/resolvers/yup";
import '../Create/UsuariosCreate.css'
import { Box, Checkbox, TextField, Typography } from "@mui/material";

interface Props {
  onSubmit: (user: Usuario) => Promise<any>;
  initialValues: Usuario;
}

const validation: Yup.SchemaOf<Usuario> = Yup.object().shape({
  _id: Yup.string().required('El id es requerido'),
  name: Yup.string().required('Nombre es requerido'),
  password: Yup.string().required('Password es requerido'),
  email: Yup.string().email('Ingrese un correo valido').required('El correo es requerido'),
  nationality: Yup.string().required('La nacionalidad es requerida'),
  verificado: Yup.boolean().required('Verificado es requerido')
});

export const UsuariosUpdateForm = ({ onSubmit, initialValues }: Props) => {

  const methods = useForm<Usuario>({
    resolver: yupResolver(validation),
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

        <Controller 
          name='email'
          control={control}
          render={(field) => (
            <TextField
              {...field}
              fullWidth
              defaultValue={initialValues.email}
              label={'Correo electrónico'}
              placeholder={'Ingrese el correo'}
              InputLabelProps={{ shrink: true }}
              error={!!field.fieldState.error}
              helperText={field.fieldState.error?.message ?? ''}
              onChange={(value) => setValue('email', value.target.value)}
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
          name='nationality'
          control={control}
          render={(field) => (
            <TextField
              {...field}
              fullWidth
              defaultValue={initialValues.nationality}
              label={'Nacionalidad'}
              placeholder={'Ingrese la nacionalidad'}
              InputLabelProps={{ shrink: true }}
              error={!!field.fieldState.error}
              helperText={field.fieldState.error?.message ?? ''}
              onChange={(value) => setValue('nationality', value.target.value)}
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
          name='verificado'
          control={control}
          render={(field) => (
            <Box display={'flex'} alignItems={'center'} >
              <Typography>Verificado: </Typography>
              <Checkbox 
                checked={getValues('verificado')}
                onChange={(value) => setValue('verificado', value.target.checked)}
              />
            </Box>
            // <TextField
            //   {...field}
            //   fullWidth
            //   value={initialValues.verificado}
            //   label={'Nacionalidad'}
            //   placeholder={'Ingrese la nacionalidad'}
            //   InputLabelProps={{ shrink: true }}
            //   error={!!field.fieldState.error}
            //   helperText={field.fieldState.error?.message ?? ''}
            //   onChange={(value) => setValue('nationality', value.target.value)}
            //   sx={{
            //     '& label.Mui-focused': {
            //       color: 'black',
            //     },
            //     '& .MuiInput-underline:after': {
            //       borderBottomColor: 'antiquewhite',
            //     },
            //     '& .MuiOutlinedInput-root': {
            //       '&.Mui-focused fieldset': {
            //         borderColor: 'antiquewhite',
            //       },
            //     },
            //   }}
            // />
          )}
        />


        <button disabled={isSubmitting} className='button-create-user' type='submit'>
          ACTUALIZAR USUARIO
        </button>
      </form>
    </FormProvider>
  )
}
