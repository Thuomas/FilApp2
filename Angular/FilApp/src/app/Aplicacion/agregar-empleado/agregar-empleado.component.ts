import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { EmpleadoService } from 'src/app/services/empleado.service';

@Component({
  selector: 'app-agregar-empleado',
  templateUrl: './agregar-empleado.component.html',
  styleUrls: ['./agregar-empleado.component.css']
})
export class AgregarEmpleadoComponent {

  loginForm: FormGroup;
  constructor(private empleadoService: EmpleadoService){
    this.loginForm = new FormGroup({
      nombre: new FormControl('', [Validators.required, Validators.minLength(5)]),
      apellido: new FormControl('', [Validators.required]),
      mail: new FormControl('', [Validators.required, Validators.email]),
      ususario: new FormControl('', [Validators.required]),
      pass: new FormControl('', [Validators.required]),
      idCargo: new FormControl('', [Validators.required]),
      idVendedor: new FormControl('', [Validators.required])
    })
  }

  // agregarEmpleado() {
  //   if (this.loginForm.valid) {
  //     const empleado = this.loginForm.value; // Obtenemos los valores del formulario
  //     this.empleadoService.addEmpleado(

  //     ).subscribe({
  //       next: (response) => {
  //         console.log('Empleado agregado exitosamente:', response);
  //       },
  //       error: (error) => {
  //         console.error('Error al agregar empleado:', error);
  //       },
  //     });
  //   } else {
  //     console.warn('Formulario no válido');
  //   }
  // }


  get controles() {
    return this.loginForm.controls;
  }
}
