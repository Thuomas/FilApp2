import { Component, ɵɵsetComponentScope } from '@angular/core';
import { Cliente, Informacion } from 'src/app/models/Cliente';
import { ClienteService } from 'src/app/services/cliente.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent {
  isHovered = false;
  clientes: Informacion[] = [];
  sigCliente: Informacion;

  constructor(public clienteService: ClienteService) {
    this.sigCliente = this.clientes[0];
    console.log(this.sigCliente)
  }
  ngOnInit(): void {
    this.llenarData();
    console.dir(this.clientes)
  }

  llenarData() {
    this.clienteService.getAllClientes().subscribe(data => {
      this.clientes = data.data;
    })
  }

  llamarPrioridad() {
    if (this.clientes.length > 0) {
      for (let cliente of this.clientes) {
        if (cliente.enEspera == 2) {
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
        if (cliente.enEspera == 1) {
          this.sigCliente = cliente;
          break;
        }
      }
    }
  }

  llamar() {
    this.llamarSig();
    console.dir(this.sigCliente)
    this.llamarPrioridad();
   // this.llamarSig();
    console.log("veo si me trajo algun cliente con prioridad")
    console.dir(this.sigCliente)
    let indice =this.sigCliente.id;
    //.sigCliente.enEspera=3;
    //this.clienteService.updateCliente(indice, this.sigCliente)
    this.clienteService.deleteCliente(indice)
  }


  onMouseEnter() {
    this.isHovered = true;
  }
  onMouseLeave() {
    this.isHovered = false;
  }

}
