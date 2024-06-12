'use client'

import { useState } from 'react'

import Login from '@/src/app/(Frontend)/components/Login/Login'
import PasRecovery from '@/src/app/(Frontend)/components/Login/PasRecovery'
import PasVerify from '@/src/app/(Frontend)/components/Login/PasVerify'

export default function Page() {
  const [mode, setMode] = useState('login')

  switch (mode) {
    case 'login':
      return <Login onRecoveryClick={() => setMode('recovery')} />
    case 'recovery':
      return <PasRecovery onVerifyClick={() => setMode('verify')} />
    case 'verify':
      return <PasVerify />
    default:
      return <Login />
  }
}
