import { Injectable } from '@angular/core';
// import { HttpClient } from 'selenium-webdriver/http';
import { HttpClient } from '@angular/common/http';
import { InfoPagina } from '../interfaces/info-pagina.interfaces';


@Injectable({
  providedIn: 'root'
})
export class InfoPaginaService {

  info: InfoPagina = {};
  cargada = false;
  equipo: any[] = [];
  
  constructor(private http: HttpClient) {
    // console.log('Servicio de infoPagina listo')
    this.cargarInfo();
    this.cargarEquipo();
  }

  private cargarInfo() {
    //Leer archivos JSON
    this.http.get('assets/data/data-pagina.json')
      .subscribe((resp: InfoPagina) => {
        this.cargada = true;
        this.info = resp;
        // console.log(resp);
      });
  }

  private cargarEquipo(){
    this.http.get('https://angular-html-2aa5f.firebaseio.com/equipo.json')
      .subscribe( (resp: any[]) => {
        this.equipo = resp;
        // console.log(resp);
      });
  }
}
