export class Suma {
    edadUno: number = 0;
    edadDos: number = 0;
    resultado: number = 0;
    promedioSuma: number = 0;
    
    calcular(){
        if(this.edadUno == 0 || this.edadDos == 0){
            alert("Ingrese ambas edades a calcular.");
        }
        else{
            this.resultado = this.edadUno + this.edadDos;
            this.promedioSuma = (this.edadUno + this.edadDos)/2;
        }
    }
    
    limpiarCampos(){
        this.resultado = 0;
        this.promedioSuma = 0;
        this.edadUno = 0;
        this.edadDos = 0;
    }
    }
