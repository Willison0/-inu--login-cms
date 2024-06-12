'use client'

import { Step, StepLabel, Stepper } from '@nextui-org/react'
import {
  Button,
  DatePicker,
  Input,
  Option,
  Select,
  Textarea,
} from '@nextui-org/react'

import { useState } from 'eact'

const Registro = () => {
  const [step, setStep] = useState(1)
  const [datosPersonales, setDatosPersonales] = useState({})
  const [sobreTi, setSobreTi] = useState({})
  const [informacionContacto, setInformacionContacto] = useState({})
  const [creaTuCuenta, setCreaTuCuenta] = useState({})

  const handleNextStep = () => {
    setStep(step + 1)
  }

  const handlePrevStep = () => {
    setStep(step - 1)
  }

  const handleInputChange = (event) => {
    const { name, value } = event.target
    switch (step) {
      case 1:
        setDatosPersonales((prevDatos) => ({ ...prevDatos, [name]: value }))
        break
      case 2:
        setSobreTi((prevSobreTi) => ({ ...prevSobreTi, [name]: value }))
        break
      case 3:
        setInformacionContacto((prevInformacion) => ({
          ...prevInformacion,
          [name]: value,
        }))
        break
      case 4:
        setCreaTuCuenta((prevCreaTuCuenta) => ({
          ...prevCreaTuCuenta,
          [name]: value,
        }))
        break
      default:
        break
    }
  }

  return (
    <Stepper value={step}>
      <Step value={1}>
        <StepLabel>Datos Personales</StepLabel>
        <form>
          <Input
            label="Primer nombre"
            name="primerNombre"
            value={datosPersonales.primerNombre}
            onChange={handleInputChange}
          />
          <Input
            label="Segundo nombre"
            name="segundoNombre"
            value={datosPersonales.segundoNombre}
            onChange={handleInputChange}
          />
          <Input
            label="Primer apellido"
            name="primerApellido"
            value={datosPersonales.primerApellido}
            onChange={handleInputChange}
          />
          <Input
            label="Segundo apellido"
            name="segundoApellido"
            value={datosPersonales.segundoApellido}
            onChange={handleInputChange}
          />
          <Input
            label="Cédula"
            name="cedula"
            value={datosPersonales.cedula}
            onChange={handleInputChange}
          />
          <Button onClick={handleNextStep}>Siguiente</Button>
        </form>
      </Step>
      <Step value={2}>
        <StepLabel>Sobre ti</StepLabel>
        <form>
          <DatePicker
            label="Fecha de nacimiento"
            value={sobreTi.fechaNacimiento}
            onChange={(date) =>
              setSobreTi((prevSobreTi) => ({
                ...prevSobreTi,
                fechaNacimiento: date,
              }))
            }
          />
          <Select
            label="Género"
            name="genero"
            value={sobreTi.genero}
            onChange={handleInputChange}
          >
            <Option value="">Seleccione una opción</Option>
            <Option value="Masculino">Masculino</Option>
            <Option value="Femenino">Femenino</Option>
            <Option value="Otro">Otro</Option>
          </Select>
          <Textarea
            label="Descripción"
            name="descripcion"
            value={sobreTi.descripcion}
            onChange={handleInputChange}
            allowHTML
          />
          <Button onClick={handlePrevStep}>Anterior</Button>
          <Button onClick={handleNextStep}>Siguiente</Button>
        </form>
      </Step>
      <Step value={3}>
        <StepLabel>Información de contacto</StepLabel>
        <form>
          <Input
            label="Nacionalidad"
            name="nacionalidad"
            value={informacionContacto.nacionalidad}
            onChange={handleInputChange}
          />
          <Input
            label="País"
            name="pais"
            value={informacionContacto.pais}
            onChange={handleInputChange}
          />
          <Input
            label="Estado"
            name="estado"
            value={informacionContacto.estado}
            onChange={handleInputChange}
          />
          <Input
            label="Ciudad"
            name="ciudad"
            value={informacionContacto.ciudad}
            onChange={handleInputChange}
          />
          <Textarea
            label="Dirección detallada"
            name="direccionDetallada"
            value={informacionContacto.direccionDetallada}
            onChange={handleInputChange}
          />
          <Button onClick={handlePrevStep}>Anterior</Button>
          <Button onClick={handleNextStep}>Siguiente</Button>
        </form>
      </Step>
      <Step value={4}>
        <StepLabel>Información de contacto</StepLabel>
        <form>
          <Input
            label="Correo electrónico"
            name="correoElectronico"
            value={informacionContacto.correoElectronico}
            onChange={handleInputChange}
          />
          <Input
            label="Número de teléfono"
            name="numeroTelefono"
            value={informacionContacto.numeroTelefono}
            onChange={handleInputChange}
          />
          <Input
            label="Facebook"
            name="facebook"
            value={informacionContacto.facebook}
            onChange={handleInputChange}
          />
          <Input
            label="Twitter"
            name="twitter"
            value={informacionContacto.twitter}
            onChange={handleInputChange}
          />
          <Input
            label="Instagram"
            name="instagram"
            value={informacionContacto.instagram}
            onChange={handleInputChange}
          />
          <Input
            label="Website"
            name="website"
            value={informacionContacto.website}
            onChange={handleInputChange}
          />
          <Button onClick={handlePrevStep}>Anterior</Button>
          <Button onClick={handleNextStep}>Siguiente</Button>
        </form>
      </Step>
      <Step value={5}>
        <StepLabel>Crea tu cuenta</StepLabel>
        <form>
          <Input
            label="Correo electrónico"
            name="correoElectronico"
            value={creaTuCuenta.correoElectronico}
            onChange={handleInputChange}
          />
          <Input
            label="Nombre de usuario"
            name="nombreUsuario"
            value={creaTuCuenta.nombreUsuario}
            onChange={handleInputChange}
          />
          <Input
            label="Contraseña"
            name="contrasena"
            value={creaTuCuenta.contrasena}
            onChange={handleInputChange}
            type="password"
          />
          <Button onClick={handlePrevStep}>Anterior</Button>
          <Button onClick={() => console.log('Registro completo!')}>
            Registrarse
          </Button>
        </form>
      </Step>
    </Stepper>
  )
}

export default Registro
