import { Injectable } from '@angular/core';
import { CollectionReference, DocumentData, Firestore, collection, collectionData, doc, limit, orderBy, setDoc, query, getDocs, addDoc } from '@angular/fire/firestore';
import { Chat } from '../Entidades/chat';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  coleccionChats: CollectionReference<DocumentData> = collection(this.firestore, 'chats');
  query: any;
  constructor(private firestore: Firestore) { }


  crearMensaje(chatACrear: Chat): Promise<void> {
    return new Promise((resolve, reject) => {
      const nuevoChat = {
        ...chatACrear
      };

      // Obtener el último ID
      getDocs(query(this.coleccionChats, orderBy('id', 'desc'), limit(1)))
        .then((querySnapshot) => {
          let ultimoID = 0;
          querySnapshot.forEach((doc) => {
            ultimoID = doc.data()['id'];
          });

          // Generar el nuevo ID incremental
          const nuevoID = ultimoID + 1;
          nuevoChat.id = nuevoID;

          // Agregar el nuevo documento a la colección
          addDoc(this.coleccionChats, nuevoChat)
            .then(() => {
              resolve();
            })
            .catch((error) => {
              reject(error);
            });
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  getListadoChats(): Observable<any>{
    const observable = collectionData(this.coleccionChats);
    return observable;
  }
}
