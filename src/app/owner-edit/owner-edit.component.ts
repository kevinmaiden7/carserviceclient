import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { OwnerService } from '../shared/owner/owner.service';
import { NgForm } from '@angular/forms';
import { CarService } from '../shared/car/car.service';

@Component({
  selector: 'app-owner-edit',
  templateUrl: './owner-edit.component.html',
  styleUrls: ['./owner-edit.component.css']
})
export class OwnerEditComponent implements OnInit, OnDestroy {
	owner: any = {};
  	sub: Subscription;

  	constructor(
		private ownerService: OwnerService,
		private route: ActivatedRoute,
		private router: Router,
		private carService: CarService
  	) { }

 	ngOnInit() {
		 this.sub = this.route.params.subscribe(params => {
			const dni = params['dni'];
			if (dni){
				this.ownerService.getByDni(dni).subscribe((data: any) => { // Obtener owner por dni
					if(data){
						this.owner = data[0];
					}
				});
			}
		 });
  	}

  	ngOnDestroy() {
  		this.sub.unsubscribe();
  	}

  	goToList(){
  		this.router.navigate(['/owner-list']);
  	}

  	save(form: NgForm){
  		this.ownerService.save(form).subscribe(result => {
  			this.goToList();
  		}, error => console.error(error));
  	}

  	remove(id){
		this.testCar();
  		/*this.ownerService.remove(id).subscribe(result => {
      		this.goToList();
    	}, error => console.error(error));*/
	}
	
	/* 	Permite verificar si el propietario a borrar tiene un carro asociado.
		En ese caso, se elimina el enlace.
	*/
	testCar(){
		var cars: Array<any> = {};
		this.carService.getAll().subscribe(data => {
			cars = data;
			for(const car of cars){
				var dataCar: any = {};
				if(car.ownerDni == this.owner.dni){
					/*this.carService.get(car.id).subscribe((dataCar: any) => {
						if(dataCar){
							console.log(dataCar);
							dataCar.ownerDni = null;
							console.log(dataCar);
							//this.carService.save(dataCar);
						}
					});*/
					dataCar.href = this.carService.get_href(car.id);
					dataCar.name = car.name;
					dataCar.ownerDni = null;
					console.log(car);
					console.log(dataCar);
					this.carService.save(dataCar);
					break;
				}
			}
		});
	}
}
