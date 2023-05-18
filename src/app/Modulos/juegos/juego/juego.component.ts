import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-juego',
  templateUrl: './juego.component.html',
  styleUrls: ['./juego.component.css']
})
export class JuegoComponent implements OnInit {
  usuario:any;
  jugarAlAhorcado: boolean = false;
  jugarAlMayorMenor: boolean = false;

  constructor(private afAuth:AngularFireAuth, private router: Router) {
  }

  jugarAhorcado(){
    this.jugarAlAhorcado = true;
  }

  jugarMayorMenor(){
  this.jugarAlMayorMenor = true;
  }

  ngOnInit(): void {
    this.jugarAlAhorcado=false;
    this.jugarAlMayorMenor=false;

  }

  dejarDeJugar(){
    this.jugarAlAhorcado=false;
    this.jugarAlMayorMenor=false;
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
