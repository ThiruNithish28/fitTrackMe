import { Component } from '@angular/core';
import { MealBox } from '../commonComponent/meal-box/meal-box';


interface MealEntry {
  list: any[]; 
  calories: number;
}


interface FoodDetails {
  snacks: MealEntry;
  breakfast: MealEntry;
  dinner: MealEntry;
  lunch: MealEntry;
}

@Component({
  selector: 'app-daily-log',
  imports: [MealBox],
  templateUrl: './daily-log.html',
  styleUrl: './daily-log.css',
})
export class DailyLog {
  
  breakfast: string = 'Breakfast';
  lunch: string = 'Lunch';
  snacks: string = 'Snacks'; 
  dinner: string = 'Dinner';

  totalCaloriesToday: number = 0;
  foodDetails: FoodDetails = {
    snacks: { list: [], calories: 0 },
    breakfast: { list: [{ name: 'Oatmeal with Berries', calories: 200, protien: 8, carbs: 32, fat: 4 },], calories: 200 },
    dinner: { list: [], calories: 0 },
    lunch: { list: [], calories: 0 }
  };
  ngOnInit() {
    this.calculateTotalCalories();
  }

  calculateTotalCalories() {
    this.totalCaloriesToday = Object.values(this.foodDetails).reduce((total, meal) => total + meal.calories, 0);
  }
}