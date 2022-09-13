import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/Entidades/usuario';

@Component({
  selector: 'app-juego',
  templateUrl: './juego.component.html',
  styleUrls: ['./juego.component.css']
})
export class JuegoComponent implements OnInit {
  usuario:any;
  constructor(private afAuth:AngularFireAuth, private router: Router) {
  }
  
  ngOnInit(): void {



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
