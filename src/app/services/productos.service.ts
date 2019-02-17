import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Producto } from '../interfaces/producto.interfaces';
import { resolve } from 'url';
import { reject } from 'q';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {
  cargando = true;
  productos: Producto[] = [];
  productoFiltrado: Producto[] = [];

  constructor( private http: HttpClient) {
      this.cargarProductos();
   }

  private cargarProductos(){
    return new Promise( ( resolve, reject) => {
      
      this.http.get('https://angular-html-2aa5f.firebaseio.com/productos_idx.json')
      .subscribe( (resp: Producto[]) => {
          this.productos = resp;

          setTimeout(() => {
            this.cargando = false;
          }, 1500);
        //  console.log(resp);

        resolve();
      });

    });
  }


  //Obtener el producto interno.
  getProducto( id: string ){
    return this.http.get(`https://angular-html-2aa5f.firebaseio.com/productos/${ id }.json`);
  }

  buscarProducto( termino: string){
    if (this.productos.length === 0) {
      //Cargar Productos.
      this.cargarProductos().then( () => {
        //Se ejecuta depsues de tener los productos.
        //Se aplica el filtro.
        this.filtrarProductos( termino );
      });
    }
    else{
      //Filtrar.
      this.filtrarProductos( termino );
    }
  }

  private filtrarProductos( termino: string ){
    //Limpiamos el Arreglo.
    this.productoFiltrado = [];

    termino = termino.toLowerCase();

    this.productos.forEach( prod => {
      const tituloLower = prod.titulo.toLowerCase();

      if ( prod.categoria.indexOf( termino ) >= 0 || tituloLower.indexOf( termino ) >= 0 ) {
        this.productoFiltrado.push( prod );
      }
    });
  }
}
