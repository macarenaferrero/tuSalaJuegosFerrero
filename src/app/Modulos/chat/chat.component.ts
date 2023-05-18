import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Chat } from 'src/app/Entidades/chat';
import { ChatService } from 'src/app/services/chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  chats: Chat[] = [];
  suscripcion: Subscription = new Subscription();
  hoy: Date = new Date();
  formChat! : FormGroup;
  usuario!:string;

  constructor(public chatService: ChatService, private afAuth:AngularFireAuth) { }
  ngOnInit(): void {
    this.getMensajes();
    this.formChat = new FormGroup({
      user: new FormControl(''),
      mensaje: new FormControl('',Validators.required),
      hora: new FormControl(''),
    })

    this.afAuth.currentUser.then(user=>{
      if(user){
        this.usuario = user.email!;
      }
    })
    this.formChat.controls['user'].setValue(this.usuario);
  }

  getMensajes() {
    this.suscripcion = this.chatService.getListadoChats().subscribe((respuesta) => {
      this.chats = [];
      respuesta.forEach((chat: any) => {
        this.chats.push({
          ...chat
        })
      });
    });
    this.chatsOrdenadosPorID;
  }

  get chatsOrdenadosPorID() {
    return this.chats.sort((a, b):any => {
      return a.hora?.localeCompare(b.hora?b.hora:'');
    });
  }

  crearMensaje() {
    const now = new Date();
    const dateStr = now.toLocaleDateString('es-AR', { year: '2-digit', month: '2-digit', day: '2-digit' });
    const timeStr = now.toLocaleTimeString('es-AR', { hour12: false, hour: '2-digit', minute: '2-digit' });
    const datetimeStr = `${dateStr} - ${timeStr}`;
    const datoGrabar: Chat = {
      user: this.usuario,
      mensaje: this.formChat.get('mensaje')!.value,
      hora: datetimeStr
    }
    this.chatService.crearMensaje(datoGrabar).then(() => {}).catch((error: string) => {});
    this.formChat.controls['mensaje'].setValue('');
    this.getMensajes();
  }


  onDestroy(): void {
    this.suscripcion.unsubscribe();
  }
}
