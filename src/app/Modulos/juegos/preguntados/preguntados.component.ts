import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';

import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Puntos } from 'src/app/Entidades/puntos';
import { Usuario } from 'src/app/Entidades/usuario';
import { HarrypotterService } from 'src/app/services/harrypotter.service';
import { PuntajeService } from 'src/app/services/puntaje.service';

@Component({
  selector: 'app-preguntados',
  templateUrl: './preguntados.component.html',
  styleUrls: ['./preguntados.component.css']
})
export class PreguntadosComponent implements OnInit {


  //personajeImg: any;
  personaje!: any;
  rtaCorrecta: boolean = false;
  mensaje!: string;
  arrayPersonajes: any = [];
  empezar: boolean = false;
  img: string = '';
  puntos!: number;
  puntosAux!: number;
  listaPuntajes: Array<Puntos> = new Array<Puntos>();
  listaOrdenada: Array<Puntos> = new Array<Puntos>();
  usuario: Usuario = new Usuario();
  ordenadas: boolean = false;
  juegoTerminado: boolean = false;
  correcta: boolean = false;
  nombresPersonajes: any[] = [];

  constructor(private apiHarryPotter: HarrypotterService, public router: Router, public afAuth: AngularFireAuth, public puntajeService: PuntajeService) {
    this.puntajeService.cargarPuntajesPreguntados();
   }
   ngOnInit(): void {
    this.afAuth.currentUser.then(user=>{
      if(user){
        this.usuario.email = user.email? user.email : '';
      }
    })

  }

  async traerPersonaje(){
    this.apiHarryPotter.obtenerPersonajesByName().subscribe((personajes:any[]) =>{
      const randomIndex = Math.floor(Math.random() * personajes.length);
      console.log("salió el " + randomIndex);

        this.img = personajes[randomIndex].image;
        this.personaje = personajes[randomIndex];
        console.log(this.img);
        console.log(this.personaje);
        this.cargarPersonajes();
        this.arrayPersonajes.push(personajes[randomIndex]);


    },
      (error: any) => {
      console.log(error)}
    );
  }


  cargarPersonajes(){
    this.arrayPersonajes = [];

    this.apiHarryPotter.obtenerPersonajes().subscribe((personajes:any[]) =>{
      const randomIndex = Math.floor(Math.random() * personajes.length);
      this.arrayPersonajes.push(personajes[randomIndex]);
    },
      (error: any) => {
      console.log(error)}
    );

    this.apiHarryPotter.obtenerPersonajes().subscribe((personajes:any[]) =>{
      const randomIndex = Math.floor(Math.random() * personajes.length);
      this.arrayPersonajes.push(personajes[randomIndex]);
    },
      (error: any) => {
      console.log(error)}
    );

    this.apiHarryPotter.obtenerPersonajes().subscribe((personajes:any[]) =>{
      const randomIndex = Math.floor(Math.random() * personajes.length);
      this.arrayPersonajes.push(personajes[randomIndex]);
    },
      (error: any) => {
      console.log(error)}
    );
    setTimeout(() => {
      this.desordenarRespuestas();
      this.ordenadas = true;
    }, 500);

  }


  desordenarRespuestas()
  {
    this.arrayPersonajes.sort(function (){return Math.random() - 0.5} );
  }

  correcto(nombre:string){
    console.log("nombre presionado " + nombre);
    if(nombre == this.personaje.name){
      this.rtaCorrecta = true;
      this.mensaje = "Correcto!";
      this.puntos += 10;
      this.puntosAux = this.puntos;
      this.correcta = true;
    }
    else{
      if(this.puntos > 0)
      {
        this.addPuntaje(this.usuario.email, this.puntosAux);
      }
      this.mensaje = "Perdiste!";
      this.puntos = 0;
      this.puntosAux = 0;
      this.juegoTerminado = true;
      this.correcta = false;
    }

    this.traerPersonaje();
  }

  async onEmpezar(){
    this.empezar = true;
    this.juegoTerminado = false;
    this.correcta = false;
    this.traerPersonaje();
    this.puntos = 0;
    this.puntosAux = 0;
    this.cargarPuntajes();
  }

  cargarPuntajes(){
    this.listaPuntajes = [];
    console.log(this.listaPuntajes);

    this.puntajeService.puntajes.subscribe((puntaje:any) =>{
      this.listaPuntajes = puntaje;
      this.listaOrdenada = this.listaPuntajes.slice(0, 3);
    });
  }

  addPuntaje(usuario: string, puntaje: number){
    this.puntajeService.addPuntaje(usuario, puntaje, this.puntajeService.puntajesPreguntados);
  }

}
