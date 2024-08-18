import { Component, OnInit } from '@angular/core';
import { Diet } from '@models/diet';
import { FoodServiceService } from '@services/food-service.service';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-diet-window',
  templateUrl: './diet-window.component.html',
  styleUrls: ['./diet-window.component.css'],
  standalone: true,
  imports: [MatButtonModule, CommonModule]
})
export class DietWindowComponent implements OnInit {

  dieta : Diet | undefined; 
  showInput = false;

  constructor(private foodService: FoodServiceService) { }
  ngOnInit(): void {
   

  }


  generarDieta(){
    this.foodService.getDiet().then(dieta => this.dieta = dieta);
    this.showInput = true
  }

}
