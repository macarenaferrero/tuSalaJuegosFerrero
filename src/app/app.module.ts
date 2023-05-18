//Modulos
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { AngularFireModule } from "@angular/fire/compat";

import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { environment } from '../environments/environment';
import { JuegosModule } from './Modulos/juegos/juegos.module';
import { SharedModule } from './Modulos/shared/shared.module';
import { JuegosRoutingModule } from './Modulos/juegos/juegos-routing.module';

//Componentes
import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login/login.component';
import { IndexComponent } from './Vistas/index/index.component';
import { ErrorComponent } from './Vistas/error/error.component';
import { QuienSoyComponent } from './Vistas/quien-soy/quien-soy.component';
import { RegistroComponent } from './auth/registro/registro.component';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { ChatRoutingModule } from './Modulos/chat/chat-routing.module';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    IndexComponent,
    ErrorComponent,
    QuienSoyComponent,
    RegistroComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    JuegosModule,
    SharedModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot(), JuegosRoutingModule, ChatRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
