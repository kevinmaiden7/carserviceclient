import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({providedIn: 'root'})
export class OwnerService {
  public API = '//thawing-chamber-47973.herokuapp.com';
  public OWNERS_API = this.API + '/owners';
  
  constructor(
  	private http: HttpClient
  ) { }

  getAll(): Observable<any> {
    return this.http.get(this.OWNERS_API);
  }

  getById(id: string) {
    return this.http.get(this.OWNERS_API + '/' + id);
  }

  getByDni(dni: string){
    return this.http.get(this.API + '/owner?dni=' + dni);
  }

  // Permite obtener el enlace href de un owner a través de su id
  get_href(id: string){
    return (this.OWNERS_API + '/' + id);
  }

  save(owner: any): Observable<any> {
    let result: Observable<Object>;
    if (owner['id']) { // El owner ya existe y se va a actualizar
      result = this.http.put(this.get_href(owner['id']), owner);
    } else { // Se va a registrar un nuevo owner
      result = this.http.post(this.OWNERS_API, owner);
    }
    return result;
  }

  remove(id: string){
    return this.http.delete(this.get_href(id));
  }
}
