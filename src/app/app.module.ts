import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { JuegoComponent } from './Vistas/juego/juego.component';
import { SumaComponent } from './Vistas/suma/suma.component';
import { LoginComponent } from './Vistas/login/login.component';
import { IndexComponent } from './Vistas/index/index.component';
import { FooterComponent } from './Vistas/footer/footer.component';
import { ErrorComponent } from './Vistas/error/error.component';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth,getAuth } from '@angular/fire/auth';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
import { QuienSoyComponent } from './Vistas/quien-soy/quien-soy.component';



@NgModule({
  declarations: [
    AppComponent,
    JuegoComponent,
    SumaComponent,
    LoginComponent,
    IndexComponent,
    FooterComponent,
    ErrorComponent,
    QuienSoyComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore())
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
