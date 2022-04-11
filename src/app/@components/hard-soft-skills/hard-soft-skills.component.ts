import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HardSoftSkills } from 'src/app/models/hard-soft-skills';
import { HardSoftSkillsService } from 'src/app/servicios/hard-soft-skills.service';

@Component({
  selector: 'app-hard-soft-skills',
  templateUrl: './hard-soft-skills.component.html',
  styleUrls: ['./hard-soft-skills.component.css']
})
export class HardSoftSkillsComponent implements OnInit {
  public hardSoftSkillss:HardSoftSkills[]=[];
  public editHardSoftSkills: HardSoftSkills;
  public eliminarHardSoftSkills: HardSoftSkills;

  constructor(private hardSoftSkillsService: HardSoftSkillsService) { }

  ngOnInit(): void {
    this.hardSoftSkillsService.getHardsoftskills()
    .subscribe(response=> this.hardSoftSkillss=response);
  }
  public getHardSoftSkills(): void {
    this.hardSoftSkillsService.getHardsoftskills().subscribe(
      (response: HardSoftSkills[]) => {
        this.hardSoftSkillss = response;
        console.log(this.hardSoftSkillss);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onAddHardSoftSkills(addForm: NgForm): void {
    document.getElementById('add-hardSoftSkills-form')?.click();
    this.hardSoftSkillsService.crearHardSoftSkills(addForm.value).subscribe(
      (response: HardSoftSkills) => {
        console.log(response);
        this.getHardSoftSkills();
        addForm.reset();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        addForm.reset();
      }
    );
  }

  public onUpdateHardSoftSkills(hardSoftSkills: HardSoftSkills): void {
    this.hardSoftSkillsService.actualizarHardSoftSkills(hardSoftSkills).subscribe(
      (response: HardSoftSkills) => {
        console.log(response);
        this.getHardSoftSkills();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onDeleteHardSoftSkills(id: number): void {
    this.hardSoftSkillsService.eliminarHardSoftSkills(id).subscribe(
      (response: void) => {
        console.log(response);
        this.getHardSoftSkills();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onOpenHardSoftSkillsModal(hardSoftSkills: HardSoftSkills, mode: string): void {
    const hardSoftSkills2 = document.getElementById('main-hardSoftSkills');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (mode === 'add') {
      button.setAttribute('data-target', '#addHardSoftSkillsModal');
    }
    if (mode === 'edit') {
      this.editHardSoftSkills = hardSoftSkills;
      button.setAttribute('data-target', '#updateHardSoftSkillsModal');
    }
    if (mode === 'delete') {
      this.eliminarHardSoftSkills = hardSoftSkills;
      button.setAttribute('data-target', '#deleteHardSoftSkillsModal');
    }
    hardSoftSkills2!.appendChild(button)
    button.click();
  }

}
