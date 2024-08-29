'use client'
import Link from 'next/link'
import { Container, Typography, Box } from '@mui/material'
import NavigateButton from './NavigateButton'
import { AppProvider, AuthProvider, SignInPage } from '@toolpad/core'
import { useTheme } from '@mui/material/styles';
import SlotsSignIn from '@/components/auth'

const providers = [
  { id: 'google', name: 'Google' },
  { id: 'credentials', name: 'Email and Password' },
]


export default function Home() {
  const signIn: (provider: AuthProvider) => void = async (provider) => {
    const promise = new Promise<void>((resolve) => {
      setTimeout(() => {
        console.log(`Sign in with ${provider.id}`)
        resolve()
      }, 500)
    })
    return promise
  }
  const theme = useTheme();
  const BRANDING = {
    logo: (
      <img
        src="/logo.png"
        alt="MUI logo"
        style={{ height: 200 }}
      />
    ),
    title: 'Acueducto la cruces',
  };
  
  return (
    <Container>
      <AppProvider branding={BRANDING} theme={theme}>
        <Box sx={{ my: 4 }}>
          <SlotsSignIn/>
        </Box>
      </AppProvider>
    </Container>
  )
}