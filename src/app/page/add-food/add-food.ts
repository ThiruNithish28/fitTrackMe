import { Component, computed, signal, WritableSignal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FoodCard } from "../../commonComponent/food-card/food-card";

interface FoodItem {
  id: number;
  name: string;
  protein: number;
  calories: number;
  carbs: number;
  fats: number;
  imageUrl: string;
  verified: boolean;
  lastLogged?: string;
  defaultAmount: number;
  maxAmount: number;
  unit: 'g' | 'oz';
}

@Component({
  selector: 'app-add-food',
  imports: [FoodCard],
  templateUrl: './add-food.html',
  styleUrl: './add-food.css',
})
export class AddFood {
  activeTab = signal<'recent' | 'frequent'>('recent');
  
  showEntryPanel = signal(false);
  selectedFood: WritableSignal<FoodItem | null> = signal(null);
  entryAmount = signal(250);
  preselectedMeal: WritableSignal<string | null> = signal(null);

  constructor(private route: ActivatedRoute){
    const meal = this.route.snapshot.queryParamMap.get('meal');
    if(meal){
      this.preselectedMeal.set(meal);
    }
  }

  foodItems: FoodItem[] = [
    {
      id: 1,
      name: 'Flame Grilled Chicken Breast',
      protein: 31,
      calories: 165,
      carbs: 0,
      fats: 4,
      imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBRu1CrLkfaVRRE2c_ckisxRZGgvuOVOWoGpcM38kUHkTzz-mI_zU3DWYFSj2wXOcekqFTQbRiMRYUmHZV--HKtBdn49zrn1WdrbV31Hpqs2Wx-pcUm33AwhGTPk1TkZdIROD04DPuSWEByKLmPQMWwmPKZdEDEOTbFVDJQ-ATB-ltgsG94mvcamgisfdLqU-F18IuJchkZetF7S9lwXJ5N9NGOlcvb5zzsuX74OwvDa3mOoSqLt3tw94GJDt1TlhWcgaqfeoBISrkX',
      verified: true,
      defaultAmount: 150,
      maxAmount: 500,
      unit: 'g'
    },
    {
      id: 2,
      name: 'Steel Cut Oats & Berries',
      protein: 8,
      calories: 240,
      carbs: 45,
      fats: 5,
      imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDbyin7VeFkgxT44Y7-jzp-bI4FtXP2cztZLdX3iABfiFV3NdIoaC74nDS6ecXU3V_J7h4P-NLrz-OXl2ykHafr_nezMkwGbG-w7h27Antot8lXNZGqjN8snku6b-lw0Q5YJYCQw0qSJOlZUHUoWXlAvz242Z4GhYW00KcwT3NUDAhQ2rosmK_9dH2dPYWVd2k7bx3GL8HcxJB2-N1ogpixtz3puuVH_xjOYld3SZoPwdabcIa4lWEIRuyLh1ajq3V6FW9GM8s3OKbY',
      verified: false,
      lastLogged: '2 days ago',
      defaultAmount: 100,
      maxAmount: 300,
      unit: 'g'
    }
  ];

  // Base macros are per 100g for calculation simplicity
  selectedFoodBaseMacros = computed(() => {
    const food = this.selectedFood();
    if (!food) return { protein: 0, carbs: 0, fats: 0, calories: 0 };

    const servingCalories = food.calories;
    const servingProtein = food.protein;
    const servingCarbs = food.carbs;
    const servingFats = food.fats;
    
    // Assuming the provided macros are for a standard serving of 100g.
    // If they were for a different serving size, we would normalize here.
    return {
      protein: servingProtein / 100,
      carbs: servingCarbs / 100,
      fats: servingFats / 100,
      calories: servingCalories / 100
    };
  });
  
  calculatedCalories = computed(() => Math.round(this.selectedFoodBaseMacros().calories * this.entryAmount()));
  calculatedProtein = computed(() => Math.round(this.selectedFoodBaseMacros().protein * this.entryAmount()));
  calculatedCarbs = computed(() => Math.round(this.selectedFoodBaseMacros().carbs * this.entryAmount()));
  calculatedFats = computed(() => Math.round(this.selectedFoodBaseMacros().fats * this.entryAmount()));

  // handler for food total quantity range selector
  onAmountChange(event: Event) {
    const target = event.target as HTMLInputElement;
    this.entryAmount.set(parseInt(target.value, 10));
  }

  // save meal
  logMeal(){
    this.closeEntryPanel();
  }


  selectTab(tab: 'recent' | 'frequent') {
    this.activeTab.set(tab);
  }

  openEntryPanel(food: FoodItem) {
    this.selectedFood.set(food);
    this.entryAmount.set(food.defaultAmount);
    this.showEntryPanel.set(true);
  }

  closeEntryPanel() {
    this.showEntryPanel.set(false);
  }

  

}
