import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-meal-box',
  imports: [],
  templateUrl: './meal-box.html',
  styleUrl: './meal-box.css',
})
export class MealBox {

  @Input() title!:string;
  @Input() mealList!:any[];
  @Input() totalCalorie!:number;

  addFood(){
    
  }
}
