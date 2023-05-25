import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class HarrypotterService {

  constructor(private http: HttpClient) { }

  public obtenerPersonajes(){
    return this.http.get<any[]>('https://hp-api.onrender.com/api/characters');
  }

  public obtenerPersonaje(num: string){
    return this.http.get('https://hp-api.onrender.com/api/character/' + num);
  }

  public obtenerPersonajesByName() {
    return this.http.get<any[]>('https://hp-api.onrender.com/api/characters').pipe(
      map((response: any[]) => response
        .map((character: any) => {
          return {
            name: character.name,
            image: character.image
          };
        })
        .filter((character: any) => character.image !== '')
      )
    );
}
}
