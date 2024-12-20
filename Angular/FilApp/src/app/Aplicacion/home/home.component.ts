import { Component } from '@angular/core';
import { Informacion } from 'src/app/models/Empleado';
import { EmpleadoService } from 'src/app/services/empleado.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  isSidebarVisible = false;
  usuarioLogueado :Informacion | null;
  constructor(public empleadoService: EmpleadoService){
    this.usuarioLogueado = this.empleadoService.usuarioLogeado
  }
  

  toggleSidebar() {
    this.isSidebarVisible = !this.isSidebarVisible;

    // Actualiza la clase del aside y del contenido
    const sidebar = document.querySelector('.sidebar') as HTMLElement;
    const content = document.querySelector('.content') as HTMLElement;

    if (this.isSidebarVisible) {
      sidebar.classList.add('visible');
      content.classList.add('sidebar-visible');
    } else {
      sidebar.classList.remove('visible');
      content.classList.remove('sidebar-visible');
    }
  }

  logout() {
    // Lógica para cerrar sesión
    console.log('Salir');
  }
}
