import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JuegoComponent } from './juego/juego.component';
import { SharedModule } from '../shared/shared.module';
import { JuegosModule } from './juegos.module';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path: '**', component:JuegoComponent},
];

@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports:[
    RouterModule
  ]
})
export class JuegosRoutingModule { }
