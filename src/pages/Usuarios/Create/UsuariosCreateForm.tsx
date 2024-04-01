
import * as Yup from 'yup';
import './UsuariosCreate.css'
import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, FormProvider, useForm } from 'react-hook-form';
import { TextField } from '@mui/material';

export interface ICreateUsuario {
  name: string;
  email: string;
  password: string;
  nationality: string;
}

interface Props {
  onSubmit: (user: ICreateUsuario) => Promise<any>;
  initialValues?: ICreateUsuario;
  isEdit?: boolean;
}

const validation: Yup.SchemaOf<ICreateUsuario> = Yup.object().shape({
  name: Yup.string().required('Nombre es requerido'),
  email: Yup.string().email('Ingrese un correo valido').required('El correo es requerido'),
  password: Yup.string()
    .matches(
      /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=])(?=\S+$).{6,12}$/,
      'La contraseña debe tener entre 6 a 12 caracteres, una mayúscula y un caracter especial.'
    )
    .required('La contraseña es requerida'),
  nationality: Yup.string().required('La nacionalidad es requerida'),
});

export const UsuariosCreateForm = ({ onSubmit, initialValues, isEdit }: Props) => {

  const methods = useForm<ICreateUsuario>({
    resolver: yupResolver(validation),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      nationality: ''
    },
    values: initialValues
  });

  const {
    formState: { isSubmitting },
    setValue, 
    control,
    handleSubmit
  } = methods;

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} className='usuarios-create-form'>
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
        <Controller 
          name='email'
          control={control}
          render={(field) => (
            <TextField
              {...field}
              fullWidth
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
          name='password'
          control={control}
          render={(field) => (
            <TextField
              {...field}
              fullWidth
              type='password'
              label={'Contraseña'}
              placeholder={'Ingrese la contraseña'}
              InputLabelProps={{ shrink: true }}
              error={!!field.fieldState.error}
              helperText={field.fieldState.error?.message ?? ''}
              onChange={(value) => setValue('password', value.target.value)}
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
        <button disabled={isSubmitting} className='button-create-user' type='submit'>
          { isEdit ? "ACTUALIZAR USUARIO" : "CREAR USUARIO"}
        </button>
      </form>
    </FormProvider>
  )
}
