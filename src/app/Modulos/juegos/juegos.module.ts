import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JuegoComponent } from './juego/juego.component';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [
    JuegoComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports:[
    JuegoComponent
  ]
})
export class JuegosModule { }
