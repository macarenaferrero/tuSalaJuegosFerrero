import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { user } from '@angular/fire/auth';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {
  title = "Registro";
  nuevoRegistro:FormGroup;
  loading: boolean = false;
  
  constructor(private fb:FormBuilder, private toastr: ToastrService, private router: Router,
    private afAuth:AngularFireAuth) { 
    this.nuevoRegistro = fb.group({
    email:["",Validators.required],
    pass:["",Validators.required],
    pass2:["",Validators.required],
    })
  }
  ngOnInit(): void {
  }

  registrar(){
    const email = this.nuevoRegistro.value.email;
    const pass = this.nuevoRegistro.value.pass;
    const pass2 = this.nuevoRegistro.value.pass2;
    
    if(pass != pass2){
      this.toastr.error("Las contraseñas ingresadas deben ser iguales", "Error");
      return;
    }

    this.loading = true;
    this.afAuth
    .createUserWithEmailAndPassword(email, pass)
    .then(() => {
      this.loading=false;
      this.toastr.success("Usuario creado con exito", 'Usuario exitoso');
      this.router.navigate(['/juegos']);
    }).catch((error) => {
      this.loading = false;
        this.toastr.error(this.firebaseError(error.code), "Error");
    });
  }

  firebaseError(code: string){
    switch (code) {
      case 'auth/email-already-in-use':
        return "El usuario ya existe.";
      case 'auth/weak-password':
        return "La contraseña debe tener mínimo 6 carácteres.";
      case 'auth/invalid-email':
        return "Email inválido.";
      default:
        return "Error desconocido";
      
    }
  }
}
