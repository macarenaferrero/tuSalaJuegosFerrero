//Modulos
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { provideAuth,getAuth } from '@angular/fire/auth';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
import { environment } from '../environments/environment';


//Componentes
import { AppComponent } from './app.component';
import { JuegoComponent } from './Vistas/juego/juego.component';
import { SumaComponent } from './Vistas/suma/suma.component';
import { LoginComponent } from './Vistas/login/login.component';
import { IndexComponent } from './Vistas/index/index.component';
import { FooterComponent } from './Vistas/footer/footer.component';
import { ErrorComponent } from './Vistas/error/error.component';
import { QuienSoyComponent } from './Vistas/quien-soy/quien-soy.component';
import { NavbarComponent } from './Vistas/navbar/navbar.component';
import { RegistroComponent } from './Vistas/registro/registro.component';
import {  AngularFireModule} from "@angular/fire/compat";


@NgModule({
  declarations: [
    AppComponent,
    JuegoComponent,
    SumaComponent,
    LoginComponent,
    IndexComponent,
    FooterComponent,
    ErrorComponent,
    QuienSoyComponent,
    NavbarComponent,
    RegistroComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot(), // ToastrModule added
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
