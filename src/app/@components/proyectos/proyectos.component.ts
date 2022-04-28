import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Proyectos } from 'src/app/models/proyectos';
import { ProyectosService } from 'src/app/servicios/proyectos.service';
import { TokenService } from 'src/app/servicios/token.service';

@Component({
  selector: 'app-proyectos',
  templateUrl: './proyectos.component.html',
  styleUrls: ['./proyectos.component.css']
})
export class ProyectosComponent implements OnInit {
  public proyectoss: Proyectos[]=[];
  public editProyectos: Proyectos;
  public eliminarProyectos: Proyectos;
  roles: string[];
  isAdmin = false;

  constructor(private proyectosService: ProyectosService,
    private tokenService: TokenService) { }

  ngOnInit(): void {
    this.proyectosService.getProyectos()
    .subscribe(response =>this.proyectoss=response);
    this.roles = this.tokenService.getAuthorities();
    this.roles.forEach(rol => {
      if (rol === 'ROLE_ADMIN') {
        this.isAdmin = true;
      }
    });
  }
  public getProyectos(): void {
    this.proyectosService.getProyectos().subscribe(
      (response: Proyectos[]) => {
        this.proyectoss = response;
        console.log(this.proyectoss);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onAddProyectos(addForm: NgForm): void {
    document.getElementById('add-proyectos-form')?.click();
    this.proyectosService.crearProyectos(addForm.value).subscribe(
      (response: Proyectos) => {
        console.log(response);
        this.getProyectos();
        addForm.reset();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        addForm.reset();
      }
    );
  }

  public onUpdateProyectos(proyectos: Proyectos): void {
    this.proyectosService.actualizarProyectos(proyectos).subscribe(
      (response: Proyectos) => {
        console.log(response);
        this.getProyectos();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onDeleteProyectos(id: number): void {
    this.proyectosService.eliminarProyectos(id).subscribe(
      (response: void) => {
        console.log(response);
        this.getProyectos();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onOpenProyectosModal(proyectos: Proyectos, mode: string): void {
    const proyectos2 = document.getElementById('main-proyectos');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (mode === 'add') {
      button.setAttribute('data-target', '#addProyectosModal');
    }
    if (mode === 'edit') {
      this.editProyectos = proyectos;
      button.setAttribute('data-target', '#updateProyectosModal');
    }
    if (mode === 'delete') {
      this.eliminarProyectos = proyectos;
      button.setAttribute('data-target', '#deleteProyectosModal');
    }
    proyectos2!.appendChild(button)
    button.click();
  }
}
