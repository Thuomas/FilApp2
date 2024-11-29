import { Component, ɵɵsetComponentScope } from '@angular/core';
import { Cliente, Info } from 'src/app/models/Cliente';
import { ClienteService } from 'src/app/services/cliente.service';
import { EmpleadoService } from 'src/app/services/empleado.service';
import { Informacion } from 'src/app/models/Empleado';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent {
  isHovered = false;
  clientes: Info[] = [];
  sigCliente: Info;
  usuarioLogueado :Informacion | null;

  constructor(public clienteService: ClienteService, public empleadoService: EmpleadoService, private router: Router) {
    this.sigCliente = this.clientes[0];
    console.log(this.sigCliente)
    this.usuarioLogueado = this.empleadoService.usuarioLogeado
  }
  ngOnInit(): void {
    this.llenarData();
    console.dir(this.clientes)
  }

  llenarData() {
    this.clienteService.getAllClientes().subscribe(data => {
      this.clientes = data.data.filter(cliente =>cliente.enEspera<=1); //filtro para traer solo los clientees que estan en espera
    })
  }

  llamarPrioridad() {
    if (this.clientes.length > 0) {
      for (let cliente of this.clientes) {
        if (cliente.enEspera == 1) {
          this.sigCliente = cliente;
          break;
        }
      }
    }
  }

  llamarSig() {
    this.llenarData()
    if (this.clientes.length > 0) {
      for (let cliente of this.clientes) {
        if (cliente.enEspera == 0) {
          this.sigCliente = cliente;
          break;
        }
      }
    }
  }

  llamar() {
    this.llamarSig();
    this.llamarPrioridad();
    this.actualizarCliente()
    this.llenarData()
  }

  actualizarCliente() {
    const id = this.sigCliente.id; // ID del cliente
    const usuarioDeAtencion = this.usuarioLogueado?.Usuario; // Usuario que atiende
    
    this.clienteService.updateCliente(id, usuarioDeAtencion).subscribe({
      next: (response) => {
        if (response.status === 'success') {
          console.log('Cliente actualizado correctamente:', response.message);
        } else {
          console.warn('Error al actualizar cliente:', response.message);
        }
      },
      error: (error) => {
        console.error('Error al actualizar cliente:', error);
      }
    });
  }
  
  finTurno(id: number){
    this.clienteService.finalizarTurno(id).subscribe({
      next: (response) => {
        if (response.status === 'success') {
          console.log('Estado actualizado correctamente:', response.message);
          this.router.navigate(['/home/inicio']);
        } else {
          console.warn('Error al actualizar estado:', response.message);
        }
      },
      error: (error) => {
        console.error('Error al actualizar estado:', error);
      }
    });
  }


  onMouseEnter() {
    this.isHovered = true;
  }
  onMouseLeave() {
    this.isHovered = false;
  }

}
