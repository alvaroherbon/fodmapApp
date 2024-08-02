import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
import { MainWindowComponent } from './main-window/main-window.component';
import { DietWindowComponent } from './diet-window/diet-window.component';

@NgModule({
  imports: [
      BrowserModule,
      AppRoutingModule,
      BrowserAnimationsModule,
      provideFirebaseApp(() => initializeApp(environment.firebase)),
      provideFirestore(() => getFirestore()),
      MainWindowComponent
    ],
    declarations: [
      AppComponent,
      DietWindowComponent
    ],

  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { 



}
