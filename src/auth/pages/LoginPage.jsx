import { Google } from "@mui/icons-material"
import { Link, Button, Grid, TextField, Typography,Alert } from "@mui/material"
import { Link as RouterLink } from "react-router-dom"
import { AuthLayout } from "../layout/AuthLayout"
import { useForm } from "../../hooks/useForm"
import { useDispatch, useSelector } from "react-redux"
import { checkingAuthentication, startGoogleSignIn, startLoginWithEmailPassword } from "../../store/auth"
import { useMemo } from "react"

const initialValues = {
  email: '',
  password: ''
};
export const LoginPage = () => {
  const { status, errorMessage } = useSelector(state => state.auth)
  //si el status es igual a 'checking' eso devuelve un boleano
  //y lo memorizo si el status cambia se va a volver a obtener el nuevo valor
  const isAutenticado = useMemo(() => status === 'checking', [status]);

  const dispatch = useDispatch();
  const { email, password, onInputChange } = useForm(initialValues)
  const onSubmit = (event) => {
    event.preventDefault();
    dispatch(startLoginWithEmailPassword({ email, password }));

  }
  const onGoogleSignIn = () => {
    console.log('google')
    dispatch(startGoogleSignIn());
  }
  return (
    <AuthLayout title="Login" >
      <form onSubmit={onSubmit}  className='animate__animated animate__fadeIn animate__faster'>
        <Grid container>
          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField label="Correo" name="email" onChange={onInputChange} value={email} type="email" placeholder="correo@google.com" fullWidth />
          </Grid>
          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField label="Contraseña" name="password" onChange={onInputChange} value={password} type="password" placeholder="Contraseña" fullWidth />
          </Grid>

          <Grid container
           display={!!errorMessage ? '' : 'none'} sx={{mt:1}}>
            <Grid item xs={12}
             >
              <Alert severity='error'>{errorMessage}</Alert>
            </Grid>
          </Grid>

          <Grid container spacing={2} sx={{ mb: 2, mt: 1 }}>
            <Grid item xs={12} sm={6}>
              <Button
                disabled={isAutenticado}
                type="submit"
                variant='contained'
                fullWidth>
                Login
              </Button>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Button
                disabled={isAutenticado}
                variant='contained'
                onClick={onGoogleSignIn}
                fullWidth>
                <Google />
                <Typography sx={{ ml: 1 }}>Google</Typography>
              </Button>
            </Grid>
          </Grid>

          <Grid container direction='row' justifyContent="end">
            <Link component={RouterLink} color='inherit' to="/auth/register">
              Crear una cuenta
            </Link>

          </Grid>

        </Grid>

      </form>
    </AuthLayout>


  )
}
