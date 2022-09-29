import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpinnerComponent } from './spinner/spinner.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';



@NgModule({
  declarations: [
    SpinnerComponent,
    NavbarComponent,
    FooterComponent
  ],
  imports: [
    CommonModule,
  ],
  exports:[
    SpinnerComponent,
    NavbarComponent,
    FooterComponent
  ]
})
export class SharedModule { }
