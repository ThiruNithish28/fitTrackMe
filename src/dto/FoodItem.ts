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