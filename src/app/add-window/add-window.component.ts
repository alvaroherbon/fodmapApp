import { AsyncPipe, CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FoodServiceService } from '@services/food-service.service';
import { map, Observable, startWith } from 'rxjs';
import { ToolbarComponent } from '../toolbar/toolbar.component';

@Component({
  selector: 'app-add-window',
  templateUrl: './add-window.component.html',
  styleUrls: ['./add-window.component.css'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    AsyncPipe,
    MatButtonModule,
    MatCardModule,
    CommonModule,
    ToolbarComponent
]
})
export class AddWindowComponent implements OnInit{
  
  nameControl = new FormControl('');
  categoryControl = new FormControl('');
  filteredOptions: Observable<string[]> | undefined;
  filteredCategories: Observable<string[]> | undefined;
  foodNames: string[] = [];
  categoryNames : string[] = [];

  ngOnInit(): void {
    this.filteredOptions = this.nameControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '')),
    );
    this.filteredCategories = this.categoryControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filterCategories(value || '')),
    );
    this.foodService.getAllFoodsNames().then(names => this.foodNames = names);
    this.foodService.getAllCategories().then(categories => this.categoryNames = categories);
 }

  constructor(private foodService: FoodServiceService) { }



  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.foodNames.filter(food => food.toLowerCase().includes(filterValue));
  }

  private _filterCategories(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.categoryNames.filter(food => food.toLowerCase().includes(filterValue));
  }

  add() {
    if(this.nameControl.value != ''){
      this.foodService.getFoodByName(this.nameControl.value ?? '').then(food => {
        if (food != null) {
          console.log(food);
        } else {
          this.foodService.addFood(this.nameControl.value ?? '', this.categoryControl.value ?? '', "Sí")
            .then(() => {
              console.log("Se ha añadido el alimento");
              
            });
        }
      });
    }
  }

}
