import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { OwnerService } from '../shared/owner/owner.service';
import { NgForm } from '@angular/forms';
import { UtilityService } from '../shared/utility.service';

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
		private utilityService: UtilityService
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
		this.utilityService.unlinkCar(this.owner.dni); // Validar si el owner tiene un carro asociado
  		this.ownerService.remove(id).subscribe(result => {
      		this.goToList();
    	}, error => console.error(error));
	}

}
