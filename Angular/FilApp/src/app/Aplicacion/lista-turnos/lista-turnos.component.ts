import { Component } from '@angular/core';
import { Cliente, Info } from 'src/app/models/Cliente';
import { ClienteService } from 'src/app/services/cliente.service';

@Component({
  selector: 'app-lista-turnos',
  templateUrl: './lista-turnos.component.html',
  styleUrls: ['./lista-turnos.component.css']
})
export class ListaTurnosComponent {

  clientes: Info[]=[];

  constructor(public clienteService: ClienteService){

  }
  
  ngOnInit():void{
    this.llenarData();
    console.dir(this.clientes)
  }

  llenarData(){
    this.clienteService.getAllClientes().subscribe(data=>{
      this.clientes = data.data.filter( cliente=>cliente.enEspera <=2 );
    }
    )
  }
}
