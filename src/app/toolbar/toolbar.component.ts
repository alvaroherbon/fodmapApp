import {Component} from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatTabsModule} from '@angular/material/tabs';
import { MainWindowComponent } from "../main-window/main-window.component";
import { AddWindowComponent } from '../add-window/add-window.component';
import { DietWindowComponent } from '../diet-window/diet-window.component';




@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css'],
  standalone: true,
  imports: [MatButtonModule, MatIconModule, MatTabsModule, MainWindowComponent, AddWindowComponent, DietWindowComponent]
})
export class ToolbarComponent {

}
