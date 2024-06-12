import { Button, Container, Input, Spacer, Text } from '@nextui-org/react'
import React, { useState } from 'react'

const VerifyCode = () => {
  const [code, setCode] = useState('')
  const [error, setError] = useState(null)

  const handleVerifyCode = async (event) => {
    event.preventDefault()
    // Llamada a la API para verificar el código
    try {
      const response = await fetch('/api/auth/verify-code', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code }),
      })
      const data = await response.json()
      if (data.success) {
        // Redirigir al usuario a la pantalla de inicio
        window.location.href = '/'
      } else {
        setError('Código incorrecto')
      }
    } catch (error) {
      setError('Error al verificar el código')
    }
  }

  return (
    <Container css={{ maxWidth: '300px', margin: '40px auto' }}>
      <Text h2>Verificar código</Text>
      <form>
        <Input
          type="text"
          value={code}
          onChange={(event) => setCode(event.target.value)}
          placeholder="Código temporal"
          fullWidth
        />
        <Spacer y={2} />
        <Button onClick={handleVerifyCode}>Verificar código</Button>
        {error && <Text color="error">{error}</Text>}
      </form>
    </Container>
  )
}

export default VerifyCode
