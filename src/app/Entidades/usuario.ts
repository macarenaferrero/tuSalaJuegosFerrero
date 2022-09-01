export class Usuario {
    usuario : string = "";
    contrasenia : string = "";
    
    validar(){
        if(this.usuario === "" || this.contrasenia === ""){
            alert("Falta completar campos para iniciar sesión.");
        }
        else{
            alert("Bienvenidx " + this.usuario + ", ha iniciado sesión correctamente.");
        }
    }
}
