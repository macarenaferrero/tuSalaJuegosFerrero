import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/Entidades/usuario';

@Component({
  selector: 'app-juego',
  templateUrl: './juego.component.html',
  styleUrls: ['./juego.component.css']
})
export class JuegoComponent implements OnInit {
  usuario:Usuario = new Usuario();
  constructor() {     
  }
  
  ngOnInit(): void {

  this.usuario.nombre = "Macarena";
  console.log(this.usuario.nombre);  
  }

  cambiarNombre():void{
    this.usuario.nombre="Jorge";
    this.usuario.apellido="Peposo";
  }
  Aceptar():void{
    console.log(this.usuario.nombre);
    console.log(this.usuario.apellido);
    
  }
}
