'use client'

import { Button, Container, Input, Spacer, Text } from '@nextui-org/react'
import React, { useState } from 'react'

const ForgotPassword = () => {
  const [email, setEmail] = useState('')
  const [code, setCode] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(false)

  const handleSendCode = async (event) => {
    event.preventDefault()
    try {
      const response = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
      const data = await response.json()
      if (data.success) {
        setError(null)
        setSuccess(true)
      } else {
        setError('Error al enviar código de recuperación')
      }
    } catch (error) {
      setError('Error al enviar código de recuperación')
    }
  }

  const handleVerifyCode = async (event) => {
    event.preventDefault()
    try {
      const response = await fetch('/api/auth/verify-code', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code }),
      })
      const data = await response.json()
      if (data.success) {
        setError(null)
        setSuccess(true)
      } else {
        setError('Código de recuperación incorrecto')
      }
    } catch (error) {
      setError('Error al verificar código de recuperación')
    }
  }

  const handleResetPassword = async (event) => {
    event.preventDefault()
    try {
      const response = await fetch('/api/auth/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ newPassword }),
      })
      const data = await response.json()
      if (data.success) {
        setError(null)
        setSuccess(true)
      } else {
        setError('Error al resetear contraseña')
      }
    } catch (error) {
      setError('Error al resetear contraseña')
    }
  }

  return (
    <Container css={{ maxWidth: '300px', margin: '40px auto' }}>
      {success ? (
        <div>
          <Text h2>Contraseña reseteada con éxito</Text>
          <Text>Puede iniciar sesión con su nueva contraseña</Text>
        </div>
      ) : (
        <form>
          <Input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="Correo electrónico"
            fullWidth
          />
          <Spacer y={2} />
          <Button onClick={handleSendCode}>
            Enviar código de recuperación
          </Button>
          {error && <Text color="error">{error}</Text>}
          {success && (
            <div>
              <Input
                type="text"
                value={code}
                onChange={(event) => setCode(event.target.value)}
                placeholder="Código de recuperación"
                fullWidth
              />
              <Spacer y={2} />
              <Button onClick={handleVerifyCode}>Verificar código</Button>
              {error && <Text color="error">{error}</Text>}
              {success && (
                <div>
                  <Input
                    type="password"
                    value={newPassword}
                    onChange={(event) => setNewPassword(event.target.value)}
                    placeholder="Nueva contraseña"
                    fullWidth
                  />
                  <Spacer y={2} />
                  <Button onClick={handleResetPassword}>
                    Resetear contraseña
                  </Button>
                  {error && <Text color="error">{error}</Text>}
                </div>
              )}
            </div>
          )}
        </form>
      )}
    </Container>
  )
}

export default ForgotPassword
