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

  this.usuario.usuario = "Macarena";
  console.log(this.usuario.usuario);
  }

  cambiarNombre():void{
    this.usuario.usuario="Jorge";
    this.usuario.contrasenia="Peposo";
  }
  Aceptar():void{
    console.log(this.usuario.usuario);
    console.log(this.usuario.contrasenia);
    
  }
}
