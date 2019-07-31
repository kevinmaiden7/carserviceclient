import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({providedIn: 'root'})
export class CarService {
  public API = '//thawing-chamber-47973.herokuapp.com';
  public CAR_API = this.API + '/cars';

  constructor(private http: HttpClient) {
  }

  getAll(): Observable<any> {
    return this.http.get(this.API + '/cool-cars');
  }

  get(id: string) {
    return this.http.get(this.CAR_API + '/' + id);
  }

  // Método adicionado: Permite obtener el enlace href de un carro a través de su id.
  get_href(id: string){
    return ('http:' + this.CAR_API + '/' + id);
  }

  save(car: any): Observable<any> {
    let result: Observable<Object>;
    if (car['href']) { // El carro ya existe y se va a actualizar
      result = this.http.put(car.href, car);
    } else { // Se va a registrar un nuevo carro
      result = this.http.post(this.CAR_API, car);
    }
    return result;
  }

  remove(href: string) {
    return this.http.delete(href);
  }

}
