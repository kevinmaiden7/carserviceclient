import { Component, OnInit } from '@angular/core';
import { OwnerService } from '../shared/owner/owner.service';
import { UtilityService } from '../shared/utility.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatCheckboxModule } from '@angular/material/checkbox';

@Component({
  selector: 'app-owner-list',
  templateUrl: './owner-list.component.html',
  styleUrls: ['./owner-list.component.css']
})
export class OwnerListComponent implements OnInit {
  owners: Array<any>;
  selectedOwners: Array<any> = [];

  constructor(
    private ownerService: OwnerService,
    private router: Router,
    private utilityService: UtilityService
  ) { }

  ngOnInit() {
    this.ownerService.getAll().subscribe(data => {
      this.owners = data._embedded.owners; // Se recibe un objeto
    });
  }

  delSelectedOwners(){
    console.log(this.selectedOwners);
    for(const owner of this.selectedOwners){
      this.remove(owner);}
      this.goToList();
  }

  remove(owner){
    this.utilityService.unlinkCar(owner.dni); // Validar si el owner tiene un carro asociado
    this.ownerService.getByDni(owner.dni).subscribe((data: any) => { // Obtener owner por dni
      if(data){
          this.ownerService.remove(data[0].id).subscribe(result => {
      		console.log("Borrado de owner exitoso");
    	  }, error => console.error(error));
      }
    });
  }
  
  goToList(){
    this.router.navigate(['/car-list']);
  }

}
