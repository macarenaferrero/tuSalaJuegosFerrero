import { Injectable } from '@angular/core';
import { CollectionReference, DocumentData, Firestore, collection, collectionData, limit, orderBy, query } from '@angular/fire/firestore';
import { Observable, map } from 'rxjs';
import { Puntos } from '../Entidades/puntos';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable({
  providedIn: 'root'
})
export class PuntajeService {

dbPathMayorMenor: string =  'puntajesMayorMenor';
dbPathAhorcado: string =  'puntajesAhorcado';
dbPathPreguntados: string =  'puntajesPreguntados';
dbPathMiJuego: string =  'puntajesMiJuego';

puntajesMayorMenor!: AngularFirestoreCollection<Puntos>;
puntajesAhorcado!: AngularFirestoreCollection<Puntos>;
puntajesPreguntados!: AngularFirestoreCollection<Puntos>;
puntajesMiJuego!: AngularFirestoreCollection<Puntos>;
puntajes!: Observable<Puntos[]>;

constructor(public db: AngularFirestore, public router: Router, public afAuth: AngularFireAuth) {
 }

 cargarPuntajesMayorMenor(){
    this.puntajesMayorMenor = this.db.collection<Puntos>(this.dbPathMayorMenor, ref => ref.orderBy('puntos','desc'));
    setTimeout(() => {
    this.getPuntajes(this.puntajesMayorMenor);
  }, 1000);
 }


 cargarPuntajesAhorcado(){
    this.puntajesAhorcado = this.db.collection<Puntos>(this.dbPathAhorcado, ref => ref.orderBy('puntos','desc'));
  setTimeout(() => {
    this.getPuntajes(this.puntajesAhorcado);
  }, 1000);
 }

 cargarPuntajesPreguntados(){
  this.puntajesPreguntados = this.db.collection<Puntos>(this.dbPathPreguntados, ref => ref.orderBy('puntos','desc'));
setTimeout(() => {
  this.getPuntajes(this.puntajesPreguntados);
}, 1000);
}

cargarPuntajesMiJuego(){
  this.puntajesMiJuego = this.db.collection<Puntos>(this.dbPathMiJuego, ref => ref.orderBy('puntos','desc'));
setTimeout(() => {
  this.getPuntajes(this.puntajesMiJuego);
}, 1000);
}


 addPuntaje(usuario: string, puntaje: number, collection: AngularFirestoreCollection){
  collection.add(
    {
      usuario: usuario,
      puntos: puntaje,
      fecha: new Date().toLocaleString()
    }
  );
 }

 getPuntajes(collection: AngularFirestoreCollection){
   this.puntajes = collection.snapshotChanges().pipe(
     map(actions => actions.map(a => a.payload.doc.data() as Puntos))
   );
   console.log(this.puntajes);
}


}
