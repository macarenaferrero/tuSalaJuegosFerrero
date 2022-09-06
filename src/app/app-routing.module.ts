import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexComponent } from './Vistas/index/index.component';
import { SumaComponent } from "./Vistas/suma/suma.component";
import { LoginComponent } from "./Vistas/login/login.component";
import { ErrorComponent } from './Vistas/error/error.component';
import { QuienSoyComponent } from './Vistas/quien-soy/quien-soy.component';

const rutas: Routes = [
  {path:"",component:IndexComponent},
  {path:"suma",component:SumaComponent},
  {path:"login",component:LoginComponent},
  {path:"quien-soy",component:QuienSoyComponent},
  {path:"**",component:ErrorComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(rutas)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
