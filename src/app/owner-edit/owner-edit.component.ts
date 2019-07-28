import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { OwnerService } from '../shared/owner/owner.service';
import { NgForm } from '@angular/forms';

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
  	) { }

 	ngOnInit() {
 		this.sub = this.route.params.subscribe(params => {
 			const id = params['id'];
 			if(id){ // Se va a editar un owner
 				 this.ownerService.get(id).subscribe((owner: any) => {
 					  if(owner){ // Existe un owner con el id ingresado
 						 this.owner = owner;
 						 this.owner.href = owner._links.self.href;
 					  }else{ // No existe un owner con el id ingresado
 						       console.log(`Owner with id '${id}' not found, returning to list`);
           				this.goToList();
 					  }
 				 })
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

  	remove(href){
  		this.ownerService.remove(href).subscribe(result => {
      		this.goToList();
    	}, error => console.error(error));
  	}
}
