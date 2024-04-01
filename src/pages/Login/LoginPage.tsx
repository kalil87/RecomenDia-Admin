import { Fragment, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import AuthService from '../../hooks/AuthService'
import { PATHS } from '../../routes/paths'
import { IconButton, Snackbar } from '@mui/material';
import './LoginPage.css'
import { Visibility, VisibilityOff, Close } from '@mui/icons-material';

export const LoginPage = () => {

  const navigate = useNavigate()

  useEffect(() => {
    if(AuthService.getCurrentUser() != null) {
      navigate(PATHS.dashboard.root)
    }
  })

  const [formData, setFormData] = useState({ email: '', password: '' });
  const [isLoading, setIsLoading] = useState(false)

  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('')
  const handleToClose = () => {
    setOpen(false);
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      const resp = await AuthService.login(formData.email, formData.password);
      if((typeof resp) === 'string'){
        setMessage(resp)
        setOpen(true)
      } else if (resp === false) {
        setMessage('Ocurrio un error al iniciar sesión')
        setOpen(true)
      } else {
        navigate(PATHS.dashboard.root)
      }
      setIsLoading(false)
    } catch (error) {
      setIsLoading(false)
    }
    
  }

  return (
    <div className='login-container'>
      <div className='login-logo'>
        <h1>Recomendia</h1>
        <span>Tu asistente del dia a dia</span>
      </div>
      <div className='login-form'>
        <form onSubmit={onSubmit}>
          <label>
            Correo electrónico
            <input 
              name='email' 
              placeholder='Ingrese su correo' 
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          </label>
          <label>
            Contraseña
            <div className='password-input'>
              <input 
                name='password' 
                type={showPassword ? 'text' : 'password'}
                placeholder='Ingrese su contraseña' 
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              />
              <IconButton
                sx={{ ml: 1, mt: 0.5, "&.MuiButtonBase-root:hover": { bgcolor: "antiquewhite" }}}
                onClick={togglePasswordVisibility}
              >
                {!showPassword ? <Visibility sx={{ "&.MuiSvgIcon-root:hover": { color: "black" } }} /> : <VisibilityOff />}
              </IconButton>
            </div>
          </label>
          
          <button className='login-button' disabled={isLoading} >
            Ingresar
          </button>
        </form>
      </div>
      <Snackbar
        anchorOrigin={{
          horizontal: "right",
          vertical: "bottom",
        }}
        open={open}
        autoHideDuration={5000}
        message={message}
        ContentProps={{
          sx: {
            backgroundColor: 'red'
          }
        }}
        onClose={handleToClose}
        action={
          <Fragment>
            <IconButton
              onClick={handleToClose}
            >
              <Close fontSize="small" sx={{ color: 'white' }} />
            </IconButton>
          </Fragment>
        }
      />
    </div>
  )
}
