import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { JuegoComponent } from './Vistas/juego/juego.component';
import { SumaComponent } from './Vistas/suma/suma.component';
import { LoginComponent } from './Vistas/login/login.component';
import { RouterModule, Routes } from '@angular/router';
import { IndexComponent } from './Vistas/index/index.component';
import { FooterComponent } from './Vistas/footer/footer.component';

const rutas: Routes = [
  {path:"",component:IndexComponent},
  {path:"suma",component:SumaComponent},
  {path:"login",component:LoginComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    JuegoComponent,
    SumaComponent,
    LoginComponent,
    IndexComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    RouterModule.forRoot(rutas)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
