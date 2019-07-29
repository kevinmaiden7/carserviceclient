import { Component, OnInit } from '@angular/core';
import { CarService } from '../shared/car/car.service';
import { GiphyService } from '../shared/giphy/giphy.service';
import { OwnerService } from '../shared/owner/owner.service';

@Component({
  selector: 'app-car-owner',
  templateUrl: './car-owner.component.html',
  styleUrls: ['./car-owner.component.css']
})
export class CarOwnerComponent implements OnInit {
  cars: Array<any>;
  owners: Array<any>;

  constructor(
    private carService: CarService,
    private giphyService: GiphyService,
    private ownerService: OwnerService
  ) { }

  ngOnInit() {
    this.carService.getAll().subscribe( data => {
      this.cars = data;
      for (const car of this.cars){
        this.giphyService.get(car.name).subscribe(url => car.giphyUrl = url);
      }
    });
    this.ownerService.getAll().subscribe(data => {
      this.owners = data._embedded.owners; // Se recibe un objeto
    });
  }

}
