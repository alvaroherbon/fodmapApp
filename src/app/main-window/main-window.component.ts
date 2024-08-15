import {Component, OnInit, ChangeDetectionStrategy, inject} from '@angular/core';
import {FormControl, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {AsyncPipe} from '@angular/common';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import { FoodServiceService } from '@services/food-service.service';
import { CommonModule } from '@angular/common';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { ToolbarComponent } from "../toolbar/toolbar.component";




@Component({
  selector: 'app-main-window',
  templateUrl: './main-window.component.html',
  styleUrls: ['./main-window.component.css'],
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
],
})
export class MainWindowComponent implements OnInit{
  nameControl = new FormControl('');
  categoryControl = new FormControl('');
  filteredOptions: Observable<string[]> | undefined;
  filteredCategories: Observable<string[]> | undefined;
  foodNames: string[] = [];
  categoryNames : string[] = [];
  
  

  constructor(private foodService: FoodServiceService) { }

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
  consultar() {
    if(this.nameControl.value != ''){
      this.foodService.getFoodByName(this.nameControl.value ?? '').then(food => {
        if(food != null){
          console.log(food);
        } else {
          
        }
      });
    }
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.foodNames.filter(food => food.toLowerCase().includes(filterValue));
  }

  private _filterCategories(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.categoryNames.filter(food => food.toLowerCase().includes(filterValue));
  }

 
  
  
}

