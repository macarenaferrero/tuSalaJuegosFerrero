
import { CommonModule } from '@angular/common';
import { JuegoComponent } from './juego/juego.component';
import { SharedModule } from '../shared/shared.module';
import { NgModule } from '@angular/core';
import { JuegosRoutingModule } from './juegos-routing.module';
import { ChatModule } from '../chat/chat.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AhorcadoComponent } from './ahorcado/ahorcado.component';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { MayorMenorComponent } from './mayor-menor/mayor-menor.component';
import { PreguntadosComponent } from './preguntados/preguntados.component';
import { HttpClientModule } from '@angular/common/http';
import { MiJuegoComponent } from './mi-juego/mi-juego.component';



@NgModule({
  declarations: [
    JuegoComponent,
    AhorcadoComponent,
    MayorMenorComponent,
    PreguntadosComponent,
    MiJuegoComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    JuegosRoutingModule,
    ChatModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    provideAuth(() => getAuth()),
    HttpClientModule
  ],
  exports:[
    JuegoComponent
  ]
})
export class JuegosModule { }
