import { Component, OnInit } from '@angular/core';
import { Suma } from 'src/app/Entidades/suma';

@Component({
  selector: 'app-suma',
  templateUrl: './suma.component.html',
  styleUrls: ['./suma.component.css']
})
export class SumaComponent implements OnInit {
  title = 'Calculadora de edades';
  miTipo = "string";

  miSuma:Suma;

  constructor(){
    this.miSuma = new Suma();
  }
  ngOnInit(): void {
  }

}
