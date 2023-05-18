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
//   colPuntajeAhorcado: CollectionReference<DocumentData> = collection(this.firestore, 'puntajeAhorcado');
//   puntajes!: Observable<Puntos[]>;
//   query: any;

//   constructor(private firestore: Firestore) { }

//   cargarPuntajesMM(){
//     // setTimeout(() => {
//       this.query = query(this.colPuntajeAhorcado, orderBy('id', 'desc'), limit(1));
// =      this.colPuntajeAhorcado = this.query;
//       setTimeout(() => {
//       this.getPuntaje(this.colPuntajeAhorcado);
//     }, 1000);
//    }

//    getPuntajes(collection: CollectionReference<DocumentData>) {
//     collection.get().then(snapshot => {
//       const puntajes = snapshot.docs.map(doc => {
//         const data = doc.data() as Puntos;
//         const id = doc.id;
//         return { id, ...data };
//       });
//       console.log(puntajes);
//     }).catch(error => {
//       console.error('Error al obtener los puntajes:', error);
//     });
//   }



dbPathMayorMenor: string =  'puntajesMayorMenor';
dbPathAhorcado: string =  'puntajesAhorcado';
puntajesMayorMenor!: AngularFirestoreCollection<Puntos>;
puntajesAhorcado!: AngularFirestoreCollection<Puntos>;
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
