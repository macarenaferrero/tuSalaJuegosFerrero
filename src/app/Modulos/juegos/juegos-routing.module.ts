import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { JuegoComponent } from './juego/juego.component';
import { AhorcadoComponent } from './ahorcado/ahorcado.component';

const routes: Routes = [
  {path: '', component:JuegoComponent,
}

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
