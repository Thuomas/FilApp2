import { Component } from '@angular/core';
import { Empleado, Informacion } from 'src/app/models/Empleado';
import { EmpleadoService } from 'src/app/services/empleado.service';
import { Cargo, InformacionCargo } from 'src/app/models/Cargo';
import { CargosService } from 'src/app/services/cargo.service';


@Component({
  selector: 'app-lista-empleados',
  templateUrl: './lista-empleados.component.html',
  styleUrls: ['./lista-empleados.component.css']
})
export class ListaEmpleadosComponent {

  empleados: Informacion[] = [];
  cargos: InformacionCargo[] = [];
  empMostrar!: Informacion;
  constructor(public empleadoService: EmpleadoService, public cargoService: CargosService) {

  }

  ngOnInit(): void {
    this.llenarData();
    this.buscarEmpleadoPorId();
  }

  llenarData() {
    this.empleadoService.getAllEmpleados().subscribe(data => {
      this.empleados = data.data;
    })
    this.cargoService.getAllCargos().subscribe(data => {
      this.cargos = data.data;
    })  
  }
  buscarEmpleadoPorId() {
    this.empleadoService.getEmpleadoById(3).subscribe(empleado => {
      if (empleado) {
        console.log('Empleado encontrado:', empleado);
        this.empMostrar= empleado

      } else {
        console.log('Empleado no encontrado');
      }
    });
  }
}

