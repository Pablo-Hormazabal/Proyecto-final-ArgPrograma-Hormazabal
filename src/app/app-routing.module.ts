import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AcercadeComponent } from './@components/acercade/acercade.component';
import { EducacionComponent } from './@components/educacion/educacion.component';
import { ExperienciaComponent } from './@components/experiencia/experiencia.component';
import { HardSoftSkillsComponent } from './@components/hard-soft-skills/hard-soft-skills.component';
import { ProyectosComponent } from './@components/proyectos/proyectos.component';
import { IndexComponent } from './index/index.component';
import { PortfilioGuardService as guard } from './guards/portfolio-guard.service';
import { LoginComponent } from './auth/login.component';


const routes: Routes = [
  {path: '', component: IndexComponent},
  {path: 'login', component: LoginComponent},
  {path: 'estudios', component: EducacionComponent, canActivate:[guard], data: {expectedRole: ['admin', 'user']}},
  {path: 'skills', component: HardSoftSkillsComponent, canActivate:[guard], data: {expectedRole: ['admin', 'user']}},
  {path: 'experiencialaboral', component: ExperienciaComponent, canActivate:[guard], data: {expectedRole: ['admin', 'user']}},
  {path: 'proyectos', component: ProyectosComponent, canActivate:[guard], data: {expectedRole: ['admin', 'user']}},
  {path: 'user', component: AcercadeComponent, canActivate:[guard], data: {expectedRole: ['admin', 'user']}}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
