export class Usuario {
    usuario : string = "";
    contrasenia : string = "";
    
    validar(){
        if(this.usuario === "" || this.contrasenia === ""){
            alert("Falta completar campos para iniciar sesión.");
        }
        else{
            localStorage.setItem("usuario", JSON.stringify(this));
        }
    }
}
