export interface Empleado {
  status: string
  data: Informacion[]
}

export interface Informacion {
  id: number
  Nombre: string
  Apellido: string
  Usuario: string
  pass: string
  idCargo: number
  idVendedor: number
  Mail: string
  Domicilio: string
  Localidad: string
  antiguedad: number
  fechaInicio: string
}
