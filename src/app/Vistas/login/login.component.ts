import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/Entidades/usuario'; 

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
title = "Login";

  miLogin:Usuario;
  constructor() { 
    this.miLogin = new Usuario();
  }

  ngOnInit(): void {
    
  }
  completar(){
  }
}
