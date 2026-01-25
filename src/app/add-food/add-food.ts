import { Component } from '@angular/core';

interface MealItem {
  id: string;
  name: string;
  quantity: number;
  calorie: number;
}

@Component({
  selector: 'app-add-food',
  imports: [],
  templateUrl: './add-food.html',
  styleUrl: './add-food.css',
})
export class AddFood {

  selectedFood:any = null;
  searchResult:MealItem[] = [];
  customMealItem: MealItem[] = [
    {
      id: '1',
      name: 'Sample Meal',
      quantity: 1,
      calorie: 250
    }
  ];
  quantity!: number;
  measurement!: string;
}
