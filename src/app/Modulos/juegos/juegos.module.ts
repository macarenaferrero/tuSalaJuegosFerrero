
import { CommonModule } from '@angular/common';
import { JuegoComponent } from './juego/juego.component';
import { SharedModule } from '../shared/shared.module';
import { NgModule } from '@angular/core';
import { JuegosRoutingModule } from './juegos-routing.module';



@NgModule({
  declarations: [
    JuegoComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    JuegosRoutingModule
  ],
  exports:[
    JuegoComponent
  ]
})
export class JuegosModule { }
