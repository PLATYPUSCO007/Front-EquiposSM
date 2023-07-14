import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GestionEquiposRoutingModule } from './gestion-equipos-routing.module';
import { HomeComponent } from './home/home.component';
import { EquiposComponent } from './equipos/equipos.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    HomeComponent,
    EquiposComponent
  ],
  imports: [
    CommonModule,
    GestionEquiposRoutingModule,
    SharedModule,
  ]
})
export class GestionEquiposModule { }
