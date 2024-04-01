import { useState } from "react";
import { SnackbarRec } from "../../components/Snackbar/SnackbarRec"
import { IconButton } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import AuthService from "../../hooks/AuthService";


export const RestorePass = () => {

  const [formData, setFormData] = useState({ password: '' });
  const [formData2, setFormData2] = useState({ password: '' });
  const [isLoading, setIsLoading] = useState(false);
  const passwordRegex = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z])(?=.*[@#$%^&+=])(?=\S+$).{6,12}$/;

  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const [showPassword2, setShowPassword2] = useState(false);
  const togglePasswordVisibility2 = () => {
    setShowPassword2(!showPassword2);
  };

  const [open, setOpen] = useState(false);
  const [isError, setIsError] = useState(false);
  const [message, setMessage] = useState('')
  const handleToClose = () => {
    setOpen(false);
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    setOpen(false);
    setIsError(false);
    setMessage('')

    if(!passwordRegex.test(formData.password)){
      setIsError(true);
      setMessage('La contraseña debe tener una mayuscula, una minuscula, un numero, un caracter especial y al menos 8 caracteres.')
      setOpen(true);
      setIsLoading(false)
      return
    }

    if(formData.password !== formData2.password){
      setIsError(true);
      setMessage('Las contraseñas no coinciden')
      setOpen(true);
      setIsLoading(false)
      return
    }

    // Obtiene la URL actual
    var url = window.location.href;

    // Divide la URL en partes usando '/' como separador
    var parts = url.split('/');

    // Obtiene el último elemento de la matriz 'parts'
    var lastPart = parts[parts.length - 1];

    try {
      const resp = await AuthService.restore(
        lastPart,
        formData.password
      );
      if((typeof resp) === 'string'){
        setMessage(resp)
        setIsError(true)
        setOpen(true)
      } else if (resp === false) {
        setMessage('Ocurrio un error al modificar contraseña')
        setIsError(true)
        setOpen(true)
      } else {
        setMessage("Contraseña modificada con exito! Vuelve a la aplicación para generar recomendaciones!")
        setIsError(false)
        setOpen(true)
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
        <h4 style={{ fontSize: '25px', textAlign: 'center' }} >Restablecer contraseña</h4>
        <form onSubmit={onSubmit}>
          <label>
            Nueva contraseña
            <div className='password-input'>
              <input 
                name='password' 
                type={showPassword ? 'text' : 'password'}
                placeholder='Ingrese su contraseña' 
                value={formData.password}
                onChange={(e) => setFormData({ password: e.target.value })}
              />
              <IconButton
                sx={{ ml: 1, mt: 0.5, "&.MuiButtonBase-root:hover": { bgcolor: "antiquewhite" }}}
                onClick={togglePasswordVisibility}
              >
                {!showPassword ? <Visibility sx={{ "&.MuiSvgIcon-root:hover": { color: "black" } }} /> : <VisibilityOff />}
              </IconButton>
            </div>
          </label>

          <label>
            Confirmar contraseña
            <div className='password-input'>
              <input 
                name='password' 
                type={showPassword2 ? 'text' : 'password'}
                placeholder='Ingrese su contraseña' 
                value={formData2.password}
                onChange={(e) => setFormData2({ password: e.target.value })}
              />
              <IconButton
                sx={{ ml: 1, mt: 0.5, "&.MuiButtonBase-root:hover": { bgcolor: "antiquewhite" }}}
                onClick={togglePasswordVisibility2}
              >
                {!showPassword2 ? <Visibility sx={{ "&.MuiSvgIcon-root:hover": { color: "black" } }} /> : <VisibilityOff />}
              </IconButton>
            </div>
          </label>
          
          <button className='login-button' disabled={isLoading} >
            Restablecer
          </button>
        </form>
      </div>
      <SnackbarRec 
        open={open}
        isError={isError}
        message={message}
        onClose={handleToClose}
      />
    </div>
  )
}
