import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexComponent } from './Vistas/index/index.component';
import { LoginComponent } from "./auth/login/login.component";
import { ErrorComponent } from './Vistas/error/error.component';
import { QuienSoyComponent } from './Vistas/quien-soy/quien-soy.component';
import { RegistroComponent } from './auth/registro/registro.component';
import { JuegosModule } from './Modulos/juegos/juegos.module';

const rutas: Routes = [
  {path:"",component:IndexComponent},
  {path:"login",component:LoginComponent},
  {path:"registro", component:RegistroComponent},
  {path:"quien-soy",component:QuienSoyComponent},
  {path: "juegos", loadChildren:()=>import('./Modulos/juegos/juegos.module').then(m => JuegosModule)},  
  {path:"**",component:ErrorComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(rutas)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
