import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Puntos } from 'src/app/Entidades/puntos';
import { Usuario } from 'src/app/Entidades/usuario';
import { PuntajeService } from 'src/app/services/puntaje.service';

@Component({
  selector: 'app-mayor-menor',
  templateUrl: './mayor-menor.component.html',
  styleUrls: ['./mayor-menor.component.css']
})
export class MayorMenorComponent implements OnInit {

  carta = {src: '', numero: ''}
  cartaSiguiente = {src: '', numero: ''};
  cartasAux: any;
  cartas = [
     {"src": "../../../../assets/mayor-menor/A_pica.png", "numero": 1},
     {"src": "../../../../assets/mayor-menor/A_trebol.png", "numero": 1},
     {"src": "../../../../assets/mayor-menor/A_diamante.png", "numero": 1},
     {"src": "../../../../assets/mayor-menor/2_pica.png", "numero": 2},
     {"src": "../../../../assets/mayor-menor/3_corazón.png", "numero": 3},
     {"src": "../../../../assets/mayor-menor/4_corazón.png", "numero": 4},
     {"src": "../../../../assets/mayor-menor/5_corazón.png", "numero": 5},
   ];
   mensaje!: string;
   puntos!: number;
   empezado: boolean = false;
   resultado: boolean = false;
   listaPuntajes: Array<Puntos> = new Array<Puntos>();
   puntosAux!: number;
   listaOrdenada: Array<Puntos> = new Array<Puntos>();
   usuario: Usuario = new Usuario();

   constructor(public router: Router, private afAuth: AngularFireAuth, public puntajeService: PuntajeService) {
     this.puntajeService.cargarPuntajesMayorMenor();

    }

   ngOnInit(): void {
    this.afAuth.currentUser.then(user=>{
      if(user){
        this.usuario.email = user.email? user.email : '';
      }
    })   }

   empezar(){
       this.cartasAux = this.cartas.slice();
       var i = Math.floor(Math.random()* this.cartasAux.length);

       this.carta.src = this.cartasAux[i].src;
       this.carta.numero = this.cartasAux[i].numero;
       delete this.cartasAux[0]['i'];
       this.puntos = 0;
       this.puntosAux = 0;
       this.empezado = true;
       this.resultado = false;

   }

   proximaCarta(){
     if(this.cartasAux.length > 0){
       var i = Math.floor(Math.random()* this.cartasAux.length);
       this.cartaSiguiente.src = this.cartasAux[i].src;
       this.cartaSiguiente.numero = this.cartasAux[i].numero;
       delete this.cartasAux[i];
     }
     else{
       this.mensaje = "¡Felicitaciones, GANASTE!";
       this.puntosAux = this.puntos;
       this.resultado = true;
       this.addPuntaje(this.usuario.email, this.puntosAux);
       this.cargarPuntajes();
     }
   }

   cartaMayor(){
     this.proximaCarta();

     if(this.carta.numero <= this.cartaSiguiente.numero){
       this.puntos += 10;
     }
     else{
       this.mensaje = "¡Perdiste!";
       this.puntosAux = this.puntos;
       this.puntos = 0;
       this.empezado = false;
       this.resultado = true;
       this.addPuntaje(this.usuario.email, this.puntosAux);
       this.cargarPuntajes();
     }
     this.carta.numero = this.cartaSiguiente.numero;
     this.carta.src = this.cartaSiguiente.src;

   }

   cartaMenor(){

     this.proximaCarta();

     if(this.carta.numero >= this.cartaSiguiente.numero){
       this.puntos += 10;
     }
     else{
       this.mensaje = "¡Perdiste!";
       this.puntosAux = this.puntos;
       this.puntos = 0;
       this.empezado = false;
       this.resultado = true;

       this.addPuntaje(this.usuario.email, this.puntosAux);
       this.cargarPuntajes();
     }
     this.carta.numero = this.cartaSiguiente.numero;
     this.carta.src = this.cartaSiguiente.src;
   }

   cargarPuntajes(){
     this.listaPuntajes = [];

     this.puntajeService.puntajes.subscribe((puntaje:any) =>{
       this.listaPuntajes = puntaje;
       this.listaOrdenada = this.listaPuntajes.slice(0, 3);
     });
   }

   addPuntaje(usuario: string, puntaje: number){
     this.puntajeService.addPuntaje(usuario, puntaje, this.puntajeService.puntajesMayorMenor);
   }

}
