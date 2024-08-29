'use client'
import * as React from 'react';
import {
  Button,
  FormControl,
  InputLabel,
  OutlinedInput,
  TextField,
  InputAdornment,
  Link,
  IconButton,
} from '@mui/material'
import AccountCircle from '@mui/icons-material/AccountCircle'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import { AuthProvider, SignInPage } from '@toolpad/core'
import { useTheme } from '@mui/material/styles'
import { useRouter } from 'next/router'

const providers = [{ id: 'credentials', name: 'Email and Password' }]

function CustomEmailField() {
  return (
    <TextField
      id="input-with-icon-textfield"
      label="Nombre de usuario"
      name="email"
      type="email"
      size="small"
      required
      fullWidth
      slotProps={{
        input: {
          startAdornment: (
            <InputAdornment position="start">
              <AccountCircle fontSize="inherit" />
            </InputAdornment>
          ),
        },
      }}
      variant="outlined"
    />
  );
}

function CustomPasswordField() {
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event: React.MouseEvent) => {
    event.preventDefault();
  };

  return (
    <FormControl sx={{ my: 2 }} fullWidth variant="outlined">
      <InputLabel size="small" htmlFor="outlined-adornment-password">
        Contrasena
      </InputLabel>
      <OutlinedInput
        id="outlined-adornment-password"
        type={showPassword ? 'text' : 'password'}
        name="password"
        size="small"
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={handleClickShowPassword}
              onMouseDown={handleMouseDownPassword}
              edge="end"
              size="small"
            >
              {showPassword ? (
                <VisibilityOff fontSize="inherit" />
              ) : (
                <Visibility fontSize="inherit" />
              )}
            </IconButton>
          </InputAdornment>
        }
        label="Contrasena"
      />
    </FormControl>
  );
}

function CustomButton() {
  return (
    <Button
      type="submit"
      variant="outlined"
      color="info"
      size="small"
      disableElevation
      fullWidth
      sx={{ my: 2 }}
    >
      Iniciar sesion
    </Button>
  );
}

function SignUpLink() {
  return (
    <Link href="/" variant="body2">
      Registrarme
    </Link>
  );
}

function ForgotPasswordLink() {
  return (
    <Link href="/" variant="body2">
      Olvidate tu contrasena?
    </Link>
  );
}

export default function SlotsSignIn() {
  const theme = useTheme()
  const signIn: (provider: AuthProvider) => void = async (provider) => {
    try {
      console.log(`Sign in successful with ${provider.id}`)
      
      window.location.href = '/page';
    } catch (error) {
      console.error('Error signing in:', error)
      throw error;
    }
  }
  return (
      <SignInPage
        signIn={signIn}
        slots={{
          emailField: CustomEmailField,
          passwordField: CustomPasswordField,
          submitButton: CustomButton,
          signUpLink: SignUpLink,
          forgotPasswordLink: ForgotPasswordLink,
        }}
        providers={providers}
      />
  );
}
