import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Subscription } from 'rxjs';
import { Color } from 'src/app/Entidades/color';
import { Puntos } from 'src/app/Entidades/puntos';
import { Usuario } from 'src/app/Entidades/usuario';
import { PuntajeService } from 'src/app/services/puntaje.service';

@Component({
  selector: 'app-mi-juego',
  templateUrl: './mi-juego.component.html',
  styleUrls: ['./mi-juego.component.css']
})
export class MiJuegoComponent implements OnInit {
  suscripcion: Subscription = new Subscription();
  usuario: Usuario = new Usuario();
  listaPuntajes: Array<Puntos> = new Array<Puntos>();
  listaOrdenada: Array<Puntos> = new Array<Puntos>();
  colorIzquierda: Color = new Color();;
  colorDerecha:Color = new Color();;
  opciones: any = ['amarillo', 'azul','verde','rojo'];
  puntajeAcumulado:number=0;
  resultado:boolean=false;
  empezado:boolean=false;
  puntosAux!: number;

  constructor(public afAuth: AngularFireAuth,public puntajeService: PuntajeService) {
    this.puntajeService.cargarPuntajesMiJuego();
  }


  ngOnInit(): void {
    this.afAuth.currentUser.then(user=>{
      if(user){
        this.usuario.email = user.email? user.email : '';
      }
    })
    this.empezado=false;
    this.resultado=false;
    this.crearColorAleatorio();
  }

  crearColorAleatorio()
  {
    var opcion1= this.randomIntFromInterval(0,3);
    var opcion2 = this.randomIntFromInterval(0,3);
    var opcion3 = this.randomIntFromInterval(0,3);
    var opcion4 =this.randomIntFromInterval(0,3);

      this.colorIzquierda.palabra=this.opciones[opcion1];
      this.colorIzquierda.colorReal=this.opciones[opcion2];
      this.colorDerecha.palabra=this.opciones[opcion3];
      this.colorDerecha.colorReal=this.opciones[opcion4];

  }

  ElegirSI()
  {
    if (this.colorIzquierda.palabra==this.colorDerecha.colorReal)
    {
      this.puntajeAcumulado= this.puntajeAcumulado+10;
      this.crearColorAleatorio();
    }else{
      this.resultado=true;
      this.empezado=false;
      this.puntosAux = this.puntajeAcumulado;
      this.addPuntaje(this.usuario.email, this.puntosAux);
      this.cargarPuntajes();
    }

  }
  ElegirNO()
  {
    if (this.colorIzquierda.palabra!=this.colorDerecha.colorReal)
    {
      this.puntajeAcumulado= this.puntajeAcumulado+10;
      this.crearColorAleatorio();
    }else{
      this.resultado=true;
      this.empezado=false;
      this.puntosAux = this.puntajeAcumulado;
      this.addPuntaje(this.usuario.email, this.puntosAux);
      this.cargarPuntajes();
    }

  }

  cargarPuntajes(){
    this.listaPuntajes = [];

    this.suscripcion = this.puntajeService.puntajes.subscribe((puntaje:any) =>{
      this.listaPuntajes = puntaje;
      this.listaOrdenada = this.listaPuntajes.slice(0, 3);
      console.log(this.listaPuntajes);
    });
  }


  randomIntFromInterval(min:number, max:number) { // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min)
  }

  empezarDeNuevo(){
    this.resultado=false;
    this.empezado=true;
    this.crearColorAleatorio();
    this.puntajeAcumulado=0;
  }

  addPuntaje(usuario: string, puntaje: number){
    this.puntajeService.addPuntaje(usuario, puntaje, this.puntajeService.puntajesMiJuego);
  }

  onDestroy(): void {
    this.suscripcion.unsubscribe();
  }

}
