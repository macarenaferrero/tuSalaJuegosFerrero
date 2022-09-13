import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Usuario } from 'src/app/Entidades/usuario'; 
import { CodeErrorService } from 'src/app/services/code-error.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
title = "Login";
Usuario:Usuario=new Usuario;
  loading: boolean=false;
  loginUsuario:FormGroup;
  constructor(private fb:FormBuilder, private toastr: ToastrService, private router: Router,
    private afAuth:AngularFireAuth, private codeError:CodeErrorService) { 
      this.loginUsuario = this.fb.group({
        email: ['',[Validators.required, Validators.email]],
        pass: ['',Validators.required]
      });
  }

  ngOnInit(): void {
    
  }
  completar(){
    this.Usuario.email = "macarenaferrero@gmail.com"
    this.Usuario.pass = "123456";
  }

  login(){
    const email = this.loginUsuario.value.email;
    const pass = this.loginUsuario.value.pass;
    this.loading = true;
    this.afAuth.signInWithEmailAndPassword(email, pass)
    .then((user) => {
      this.toastr.success("Ingreso satisfactorio","Sesión iniciada")
      this.router.navigate(['/juegos']);
    }).catch((error) => {
      this.loading=false;
      this.toastr.error(this.codeError.firebaseError(error.code), "Error");
    })
  }
}