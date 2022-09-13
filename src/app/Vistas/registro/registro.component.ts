import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { user } from '@angular/fire/auth';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { CodeErrorService } from 'src/app/services/code-error.service';
import { Usuario } from 'src/app/Entidades/usuario';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {
  title = "Registro";
  Usuario:Usuario=new Usuario;
  nuevoRegistro:FormGroup;
  loading: boolean = false;
  
  constructor(private fb:FormBuilder, private toastr: ToastrService, private router: Router,
    private afAuth:AngularFireAuth, private codeError:CodeErrorService) { 
    this.nuevoRegistro = fb.group({
    email:["",[Validators.required, Validators.email]],
    pass:["",Validators.required],
    pass2:["",Validators.required],
    })
  }
  ngOnInit(): void {
  }

  registrar(){
    
    if(this.Usuario.pass != this.Usuario.pass2){
      this.toastr.error("Las contraseñas ingresadas deben ser iguales", "Error");
      return;
    }

    this.loading = true;
    this.afAuth
    .createUserWithEmailAndPassword(this.Usuario.email, this.Usuario.pass)
    .then(() => {
      this.loading=false;
      this.toastr.success("Usuario creado con exito", 'Usuario exitoso');
      this.router.navigate(['/juegos']);
    }).catch((error) => {
      this.loading = false;
        this.toastr.error(this.codeError.firebaseError(error.code), "Error");
    });
  }

  
}
