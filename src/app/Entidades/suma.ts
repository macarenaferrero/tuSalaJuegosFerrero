export class Suma {
    edadUno: number|undefined;
    edadDos: number|undefined;
    resultado: number|undefined;
    promedioSuma: number|undefined;
    
    calcular(){
        
        if(this.edadUno && this.edadDos){
            this.resultado = this.edadUno + this.edadDos;
            this.promedioSuma = (this.edadUno + this.edadDos)/2;
        }else{
            alert("Ingrese ambas edades a calcular.");
        }
    }
    
    limpiarCampos(){
        this.resultado = undefined;
        this.promedioSuma = undefined;
        this.edadUno = undefined;
        this.edadDos = undefined;
    }
    }
