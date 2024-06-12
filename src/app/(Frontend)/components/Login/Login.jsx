// Asegúrate de que todos los componentes de @nextui-org/react estén importados correctamente.
import { Button, Checkbox, Col, Container, Input, Row } from '@nextui-org/react'
import React from 'react'
import { useForm } from 'react-hook-form'

import Link from 'next/link'

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const onSubmit = (data) => console.log(data)

  return (
    <Container>
      <Row justify="center" align="center" style={{ minHeight: '100vh' }}>
        <Col>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Input
              clearable
              bordered
              fullWidth
              color="primary"
              size="lg"
              placeholder="Nombre Usuario"
              {...register('usuario', { required: true })}
            />
            {errors.usuario && <span>Este campo es obligatorio</span>}
            <Input.Password
              clearable
              bordered
              fullWidth
              color="primary"
              size="lg"
              placeholder="Contraseña"
              {...register('password', { required: true })}
            />
            {errors.password && <span>Este campo es obligatorio</span>}
            <Checkbox {...register('recuerda')}>Recuérdame</Checkbox>
            <Button auto shadow type="submit" color="primary">
              Ingresar
            </Button>
          </form>
          <Row justify="space-between">
            {/* Utiliza el componente Link de @nextui-org/react para los enlaces */}
            <Link color="primary" href="#">
              Recuperar Contraseña?
            </Link>
            <Link color="primary" href="/registro">
              Registrar
            </Link>
          </Row>
        </Col>
      </Row>
    </Container>
  )
}
