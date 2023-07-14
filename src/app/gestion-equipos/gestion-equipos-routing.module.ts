import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { EquiposComponent } from './equipos/equipos.component';

const routes: Routes = [{
  path: '',
  children: [{
    path: '',
    component: HomeComponent
  },
  {
    path: 'equipos',
    component: EquiposComponent
  },
  {
    path: '**',
    redirectTo: ''
  }]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GestionEquiposRoutingModule { }
