import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Puntos } from 'src/app/Entidades/puntos';
import { Usuario } from 'src/app/Entidades/usuario';
import { PuntajeService } from 'src/app/services/puntaje.service';

@Component({
  selector: 'app-ahorcado',
  templateUrl: './ahorcado.component.html',
  styleUrls: ['./ahorcado.component.css']
})
export class AhorcadoComponent implements OnInit {

  @Output() seCreaAbecedario: EventEmitter<any> = new EventEmitter<any>();

  palabrasAux: string[] = ["hashtag", "click", "recreo", "globo","foto", "nariz"];
  palabra!: string;
  palabraEnGuiones!: string;
  letra = {"nombre": ''};
  letras = [{"nombre": 'A'},{"nombre": 'B'},{"nombre": 'C'},{"nombre": 'D'},{"nombre": 'E'},{"nombre": 'F'},{"nombre": 'G'},{"nombre": 'H'},
  {"nombre": 'I'},{"nombre": 'J'},{"nombre": 'K'},{"nombre": 'L'},{"nombre": 'M'},{"nombre": 'N'},{"nombre": 'Ñ'},{"nombre": 'O'},
  {"nombre": 'P'},{"nombre": 'Q'},{"nombre": 'R'},{"nombre": 'S'},{"nombre": 'T'},{"nombre": 'U'},{"nombre": 'V'},{"nombre": 'W'},
  {"nombre": 'X'},{"nombre": 'Y'},{"nombre": 'Z'}];
  arrayLetras: any = [];
  errores!: number;
  mensaje!: string;
  empezado: boolean = false;
  resultado: boolean = false;
  puntos!: number;
  puntosAux!: number;
  listaPuntajes: Array<Puntos> = new Array<Puntos>();
  listaOrdenada: Array<Puntos> = new Array<Puntos>();
  usuario: Usuario = new Usuario();
  palabraCompletada: boolean = false;
  juegoCompletado: boolean = false;
  comenzar:string = "../../../../assets/ahorcado/Ahorcado1.png";

  constructor(public router: Router, private afAuth: AngularFireAuth, public puntajeService: PuntajeService) {
    this.puntajeService.cargarPuntajesAhorcado();
   }

  ngOnInit(): void {
    this.afAuth.currentUser.then(user=>{
      if(user){
        this.usuario.email = user.email? user.email : '';
      }
    })
    this.crearAbecedario();
    this.puntosAux = 0;
  }

  empezar(){
    this.cambiarImagen();
    var i = Math.floor(Math.random()* this.palabrasAux.length);
    this.palabra = this.palabrasAux[i];
    if(this.palabra){
      this.palabraEnGuiones = this.palabra.replace(/./g, "_ ");
    }

    this.palabrasAux.splice(i, 1);


    this.errores = 0;
    this.empezado = true;
    this.resultado = false;
    this.juegoCompletado = false;
    this.palabraCompletada = false;

  }

  crearAbecedario(){
    this.letras.forEach(element => {
      let instancia = {nombre: element.nombre};
      this.seCreaAbecedario.emit(instancia);
      this.agregarNuevoProducto(instancia);
    });
  }

  onLetra(letra: string){

    let coincidencias = 0;

    for (let index = 0; index < this.palabra.length; index++) {
      const element = this.palabra[index];

      if(letra.toLowerCase() == element){
        this.palabraEnGuiones = this.replaceAt(index*2, element.toLocaleUpperCase());
        coincidencias++;
      }
    }

    if(coincidencias == 0){
      this.errores++;

      this.cambiarImagen();
    }

    if(this.palabraEnGuiones.indexOf('_') < 0){
      this.mensaje = "¡Felicitaciones, GANASTE!";
      this.empezado = false;
      this.resultado = true;
      this.puntos = this.palabra.length * 10;
      this.puntosAux += this.puntos;
      this.palabraCompletada = true;
      if(this.palabrasAux.length <= 0){
        this.mensaje =  "¡Juego Completado!";
        this.palabraCompletada = false;
        this.juegoCompletado = true;
      }
      this.addPuntaje(this.usuario.email, this.puntosAux);
      this.cargarPuntajes();
    }


  }

  replaceAt(index: number, char: string) {
    var a = this.palabraEnGuiones.split("");
    a[index] = char;
    return a.join("");
  }

  agregarNuevoProducto(letra: any){
    this.arrayLetras.push(letra);
  }

  cambiarImagen()
  {
    switch(this.errores){
      case 0:
        document.querySelector("#horca")?.setAttribute("src", "../../../../assets/ahorcado/Ahorcado1.png");
        break
      case 1:
        document.querySelector("#horca")?.setAttribute("src", "../../../../assets/ahorcado/Ahorcado2.png");
        break;
      case 2:
        document.querySelector("#horca")?.setAttribute("src", "../../../../assets/ahorcado/Ahorcado3.png");
        break;
      case 3:
        document.querySelector("#horca")?.setAttribute("src", "../../../../assets/ahorcado/Ahorcado4.png");
        break;
      case 4:
        document.querySelector("#horca")?.setAttribute("src", "../../../../assets/ahorcado/Ahorcado5.png");
        break;
      case 5:
        document.querySelector("#horca")?.setAttribute("src", "../../../../assets/ahorcado/Ahorcado6.png");
        break;
      case 6:
        document.querySelector("#horca")?.setAttribute("src", "../../../../assets/ahorcado/Ahorcado7.png");
        this.mensaje = "¡Fuiste ahorcado!";
        this.resultado = true;
        this.empezado = false;
        this.puntos = 0;
        this.puntosAux = this.puntos;
        this.palabraCompletada = false;
        this.addPuntaje(this.usuario.email, this.puntosAux);
        this.cargarPuntajes();
        break
    }
  }

  cargarPuntajes(){
    this.listaPuntajes = [];
    this.puntajeService.puntajes.subscribe((puntaje:any) =>{
      this.listaPuntajes = puntaje;
      this.listaOrdenada = this.listaPuntajes.slice(0, 3);

    });
  }

  addPuntaje(usuario: string, puntaje: number){
    this.puntajeService.addPuntaje(usuario, puntaje, this.puntajeService.puntajesAhorcado);
  }

}
