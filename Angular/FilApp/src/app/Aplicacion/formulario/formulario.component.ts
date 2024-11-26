import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Empleado, Informacion } from 'src/app/models/Empleado';
import { EmpleadoService } from '../../services/empleado.service';


@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css']
})
export class FormularioComponent {

  loginForm: FormGroup;
  empleados: Informacion[] = [];


  constructor(public empleadoService: EmpleadoService, private router: Router) {
    this.loginForm = new FormGroup({
      usuario: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.minLength(5), Validators.required]),
    });

  }

  ngOnInit(): void {
    this.llenarData();
  }

  llenarData() {
    this.empleadoService.getAllEmpleados().subscribe(data => {
      this.empleados = data.data;
    })
  }
  EnviarFormulario() {

    const usuario = this.loginForm.get('usuario')?.value;
    const clave = this.loginForm.get('password')?.value;

    if (this.loginForm.valid) {
      console.dir(this.empleados)
      console.log(usuario)
      console.log(clave)
      for (let empleado of this.empleados) {
        if (empleado.Usuario == usuario && empleado.pass == clave) {
          this.empleadoService.usuarioLogeado = empleado
          this.Ingresar();
        }
      }
    }
  }

  Ingresar() {
    this.router.navigate(['/home']);
  }

  get controles() {
    return this.loginForm.controls;
  }
}