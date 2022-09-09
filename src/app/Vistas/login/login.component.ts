import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Usuario } from 'src/app/Entidades/usuario'; 

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
title = "Login";
  loading: boolean=false;
  loginUsuario:FormGroup;
  constructor(private fb:FormBuilder, private toastr: ToastrService, private router: Router,
    private afAuth:AngularFireAuth) { 
      this.loginUsuario = this.fb.group({
        email: ['',Validators.required],
        pass: ['',Validators.required]
      });
  }

  ngOnInit(): void {
    
  }
  completar(){
  }

  login(){
    const email = this.loginUsuario.value.email;
    const pass = this.loginUsuario.value.pass;
    this.loading = true;
    this.afAuth.signInWithEmailAndPassword(email, pass)
    .then((user) => {
      this.router.navigate(['/juegos']);
    }).catch((error) => {
      this.loading=false;
      console.log(error);
    })
  }
}