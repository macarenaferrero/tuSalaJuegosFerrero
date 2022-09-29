import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes } from '@angular/router';
import { JuegoComponent } from './juego/juego.component';
import { SharedModule } from '../shared/shared.module';

const routes: Routes = [
  {path:'juegos',component:JuegoComponent},
  {path: '', redirectTo:'/juegos',pathMatch:'full'},
  //{path:'**',component:ErrorComponent}
];

@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class JuegosRoutingModule { }
