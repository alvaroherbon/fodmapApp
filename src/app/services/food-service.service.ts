import { Injectable } from '@angular/core';
import { Firestore, addDoc, collection, getDocs, query } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class FoodServiceService {

  constructor(private firestore : Firestore) {



   }


  
}
