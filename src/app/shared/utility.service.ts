import { Injectable } from '@angular/core';
import { Subscription } from 'rxjs';
import { CarService } from '../shared/car/car.service';

@Injectable({
  providedIn: 'root'
})
export class UtilityService {

  constructor(
    private carService: CarService
  ) { }

  /* 	Permite verificar si el propietario a borrar tiene un carro asociado.
		  En ese caso, se elimina el enlace.
		  El owner se identifica por dni, valor que es pasado como parámetro.
	*/
	unlinkCar(dni){
		this.carService.getAll().subscribe((data) => {
			for(const car of data){
				if(car.ownerDni == dni){ // El owner tiene asociado un carro
					car.href = this.carService.get_href(car.id);
					car.ownerDni = null;
					this.carService.save(car).subscribe(() => {
						console.log("Se desenlazo el owner del carro exitosamente");
					}, error => console.error(error));
				}
			}
		});
	}

}
