import { Component, OnInit } from '@angular/core';
import { Acercade } from 'src/app/models/acercade';
import { AcercadeService } from 'src/app/servicios/acercade.service';
import { HttpErrorResponse } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { TokenService } from 'src/app/servicios/token.service';

@Component({
  selector: 'app-acercade',
  templateUrl: './acercade.component.html',
  styleUrls: ['./acercade.component.css']
})
export class AcercadeComponent implements OnInit {
  public acercades:Acercade[]=[];
  public editAcercade: Acercade;
  public eliminarAcercade: Acercade;
  roles: string[];
  isAdmin = false;

  constructor(private acercadeService: AcercadeService,
    private tokenService: TokenService) { }

  ngOnInit(): void {
    this.acercadeService.getAcercade()
    .subscribe(response=> this.acercades=response);
    this.roles = this.tokenService.getAuthorities();
    this.roles.forEach(rol => {
      if (rol === 'ROLE_ADMIN') {
        this.isAdmin = true;
      }
    });
  }
  public getAcercade(): void {
    this.acercadeService.getAcercade().subscribe(
      (response: Acercade[]) => {
        this.acercades = response;
        console.log(this.acercades);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onAddAcercade(addForm: NgForm): void {
    document.getElementById('add-acercade-form')?.click();
    this.acercadeService.crearAcercade(addForm.value).subscribe(
      (response: Acercade) => {
        console.log(response);
        this.getAcercade();
        addForm.reset();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        addForm.reset();
      }
    );
  }

  public onUpdateAcercade(acercade: Acercade): void {
    this.acercadeService.actualizarAcercade(acercade).subscribe(
      (response: Acercade) => {
        console.log(response);
        this.getAcercade();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onDeleteAcercade(id: number): void {
    this.acercadeService.eliminarAcercade(id).subscribe(
      (response: void) => {
        console.log(response);
        this.getAcercade();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onOpenModal(acercade: Acercade, mode: string): void {
    const sobremi = document.getElementById('main-sobremi');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (mode === 'add') {
      button.setAttribute('data-target', '#addAcercadeModal');
    }
    if (mode === 'edit') {
      this.editAcercade = acercade;
      button.setAttribute('data-target', '#updateAcercadeModal');
    }
    if (mode === 'delete') {
      this.eliminarAcercade = acercade;
      button.setAttribute('data-target', '#deleteAcercadeModal');
    }
    sobremi!.appendChild(button)
    button.click();
  }
}
