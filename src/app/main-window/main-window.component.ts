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
 
  filteredOptions: Observable<string[]> | undefined;
   foodNames: string[] = [];
 
  
  constructor(private foodService: FoodServiceService) { }

  ngOnInit(): void {
    this.filteredOptions = this.nameControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '')),
    );
    this.foodService.getAllFoodsNames().then(names => this.foodNames = names);
   
    
  }

  updateFoodList() {
    this.foodService.getAllFoodsNames().then(names => this.foodNames = names);
  }
  

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.foodNames.filter(food => food.toLowerCase().includes(filterValue));
  }

 

 
  
  
}

