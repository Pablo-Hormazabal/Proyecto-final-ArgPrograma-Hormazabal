import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './@components/navbar/navbar.component';
import { AcercadeComponent } from './@components/acercade/acercade.component';
import { BannerComponent } from './@components/banner/banner.component';
import { EducacionComponent } from './@components/educacion/educacion.component';
import { ExperienciaComponent } from './@components/experiencia/experiencia.component';
import { FooterComponent } from './@components/footer/footer.component';
import { HardSoftSkillsComponent } from './@components/hard-soft-skills/hard-soft-skills.component';
import { ProyectosComponent } from './@components/proyectos/proyectos.component';
import { HttpClientModule } from '@angular/common/http';
import { NgCircleProgressModule } from 'ng-circle-progress';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    AcercadeComponent,
    BannerComponent,
    EducacionComponent,
    ExperienciaComponent,
    FooterComponent,
    HardSoftSkillsComponent,
    ProyectosComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgCircleProgressModule.forRoot({}),
    FormsModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
