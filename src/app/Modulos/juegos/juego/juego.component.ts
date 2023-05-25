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
  jugarAlPreguntados: boolean = false;
  jugarAlMio: boolean = false;

  constructor(private afAuth:AngularFireAuth, private router: Router) {
  }

  jugarAhorcado(){
    this.jugarAlAhorcado = true;
  }

  jugarMayorMenor(){
  this.jugarAlMayorMenor = true;
  }

  jugarPreguntados(){
    this.jugarAlPreguntados = true;
    }

    jugarMio(){
      this.jugarAlMio = true;
    }

  ngOnInit(): void {
    this.jugarAlAhorcado=false;
    this.jugarAlMayorMenor=false;
    this.jugarAlPreguntados = false;
    this.jugarAlMio = false;
  }

  dejarDeJugar(){
    this.jugarAlAhorcado=false;
    this.jugarAlMayorMenor=false;
    this.jugarAlPreguntados = false;
    this.jugarAlMio = false;
  }

  Aceptar():void{
    console.log(this.usuario.usuario);
    console.log(this.usuario.contrasenia);

  }


}
