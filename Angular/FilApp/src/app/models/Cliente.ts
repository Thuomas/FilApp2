export interface Cliente {
    status: string
    data: Informacion[]
}

export interface Informacion {
    id: number
    nombre: string
    apellido: string
    mail: string
    ingreso?: Date
    inicioAtencion?: Date
    finAtencion: Date
    usuarioDeAtencion: string
    enEspera: number
    Localidad: string
    motivo: string
    
}
