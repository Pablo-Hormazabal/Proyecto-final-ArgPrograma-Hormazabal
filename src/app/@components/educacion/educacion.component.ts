import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Educacion } from 'src/app/models/educacion';
import { EducacionService } from 'src/app/servicios/educacion.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-educacion',
  templateUrl: './educacion.component.html',
  styleUrls: ['./educacion.component.css']
})
export class EducacionComponent implements OnInit {
  public educacions:Educacion[]=[];
  public editEducacion: Educacion;
  public eliminarEducacion: Educacion;

  constructor(private educacionService: EducacionService) { }

  ngOnInit(): void {
    this.educacionService.getEducacion()
    .subscribe(response=> this.educacions=response);
  }
  public getEducacion(): void {
    this.educacionService.getEducacion().subscribe(
      (response: Educacion[]) => {
        this.educacions = response;
        console.log(this.educacions);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onAddEducacion(addForm: NgForm): void {
    document.getElementById('add-educacion-form')?.click();
    this.educacionService.crearEducacion(addForm.value).subscribe(
      (response: Educacion) => {
        console.log(response);
        this.getEducacion();
        addForm.reset();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        addForm.reset();
      }
    );
  }

  public onUpdateEducacion(educacion: Educacion): void {
    this.educacionService.actualizarEducacion(educacion).subscribe(
      (response: Educacion) => {
        console.log(response);
        this.getEducacion();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onDeleteEducacion(id: number): void {
    this.educacionService.eliminarEducacion(id).subscribe(
      (response: void) => {
        console.log(response);
        this.getEducacion();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onOpenModal(educacion: Educacion, mode: string): void {
    const educacion2 = document.getElementById('main-educacion');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (mode === 'add') {
      button.setAttribute('data-target', '#addEducacionModal');
    }
    if (mode === 'edit') {
      this.editEducacion = educacion;
      button.setAttribute('data-target', '#updateEducacionModal');
    }
    if (mode === 'delete') {
      this.eliminarEducacion = educacion;
      button.setAttribute('data-target', '#deleteEducacionModal');
    }
    educacion2!.appendChild(button)
    button.click();
  }
}
