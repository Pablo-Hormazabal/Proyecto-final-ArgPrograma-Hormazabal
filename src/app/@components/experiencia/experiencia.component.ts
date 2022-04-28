import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Experiencia } from 'src/app/models/experiencia';
import { ExperienciaService } from 'src/app/servicios/experiencia.service';
import { TokenService } from 'src/app/servicios/token.service';

@Component({
  selector: 'app-experiencia',
  templateUrl: './experiencia.component.html',
  styleUrls: ['./experiencia.component.css']
})
export class ExperienciaComponent implements OnInit {
  public experiencias:Experiencia[]=[];
  public editExperiencia: Experiencia;
  public eliminarExperiencia: Experiencia;
  roles: string[];
  isAdmin = false;

  constructor(private experienciaService: ExperienciaService,
    private tokenService: TokenService) { }

  ngOnInit(): void {
    this.experienciaService.getExperiencia()
      .subscribe(response => this.experiencias=response)
      this.roles = this.tokenService.getAuthorities();
    this.roles.forEach(rol => {
      if (rol === 'ROLE_ADMIN') {
        this.isAdmin = true;
      }
    });
  }
  public getExperiencia(): void {
    this.experienciaService.getExperiencia().subscribe(
      (response: Experiencia[]) => {
        this.experiencias = response;
        console.log(this.experiencias);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onAddExperiencia(addForm: NgForm): void {
    document.getElementById('add-experiencia-form')?.click();
    this.experienciaService.crearExperiencia(addForm.value).subscribe(
      (response: Experiencia) => {
        console.log(response);
        this.getExperiencia();
        addForm.reset();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        addForm.reset();
      }
    );
  }

  public onUpdateExperiencia(experiencia: Experiencia): void {
    this.experienciaService.actualizarExperiencia(experiencia).subscribe(
      (response: Experiencia) => {
        console.log(response);
        this.getExperiencia();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onDeleteExperiencia(id: number): void {
    this.experienciaService.eliminarExperiencia(id).subscribe(
      (response: void) => {
        console.log(response);
        this.getExperiencia();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onOpenExperienciaModal(experiencia: Experiencia, mode: string): void {
    const experiencia2 = document.getElementById('main-experiencia');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (mode === 'add') {
      button.setAttribute('data-target', '#addExperienciaModal');
    }
    if (mode === 'edit') {
      this.editExperiencia = experiencia;
      button.setAttribute('data-target', '#updateExperienciaModal');
    }
    if (mode === 'delete') {
      this.eliminarExperiencia = experiencia;
      button.setAttribute('data-target', '#deleteExperienciaModal');
    }
    experiencia2!.appendChild(button)
    button.click();
  }

}
