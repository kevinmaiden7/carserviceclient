import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({providedIn: 'root'})
export class OwnerService {
  public API = '//thawing-chamber-47973.herokuapp.com/owners';
  constructor(
  	private http: HttpClient
  ) { }

  getAll(): Observable<any> {
    return this.http.get(this.API);
  }

  get(id: string) {
    return this.http.get(this.API + '/' + id);
  }

  save(owner: any): Observable<any> {
    let result: Observable<Object>;
    if (owner['href']) { // El owner ya existe y se va a actualizar
      result = this.http.put(owner.href, owner);
    } else { // Se va a registrar un nuevo owner
      result = this.http.post(this.API, owner);
    }
    return result;
  }

  remove(href: string){
    return this.http.delete(href);
  }
}
