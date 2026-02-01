import { Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { RobotCoach } from '../../commonComponent/robot-coach/robot-coach';

interface LoggedFoodItem {
  name: string;
  kcal: number;
  // macros in grams (optional for backwards compatibility)
  protein?: number;
  carbs?: number;
  fat?: number;
}

interface Meal {
  name: string;
  currentKcal: number;
  limitKcal: number;
  loggedItems: LoggedFoodItem[];
} 
@Component({
  selector: 'app-daily-log',
  imports: [RouterLink, RobotCoach],
  templateUrl: './daily-log.html',
  styleUrl: './daily-log.css',
})
export class DailyLog {


  meals = signal<Meal[]>([
    {
      name: 'Breakfast',
      currentKcal: 528,
      limitKcal: 538,
      loggedItems: [
        { name: 'Oatmeal & Berries', kcal: 240, protein: 8, carbs: 40, fat: 5 },
        { name: 'Scrambled Eggs (3)', kcal: 270, protein: 18, carbs: 2, fat: 20 },
        { name: 'Side of Bacon', kcal: 140, protein: 9, carbs: 0, fat: 11 },
      ],
    },
    {
      name: 'Lunch',
      currentKcal: 600,
      limitKcal: 650,
      loggedItems: [
        { name: 'Grilled Chicken', kcal: 280, protein: 40, carbs: 0, fat: 6 },
        { name: 'Brown Rice', kcal: 140, protein: 3, carbs: 30, fat: 1 },
      ],
    },
    { name: 'Dinner', currentKcal: 0, limitKcal: 560, loggedItems: [] },
    {
      name: 'Snacks',
      currentKcal: 0,
      limitKcal: 300,
      loggedItems: [{ name: 'Protein Bar', kcal: 120, protein: 10, carbs: 12, fat: 4 }],
    },
  ]);
  coachAngry = signal(false);
  // coachMood: 'neutral' | 'angry' | 'proud' | 'motivating'
  coachMood = signal<'neutral'|'angry'|'proud'|'motivating'>('neutral');
  expandedMeal = signal<string | null>(null);

  ngOnInit() {
    // Initialization logic and initial mood evaluation
    this.meals().map(meal => {
      if (this.isOverLimit(meal)) this.coachAngry.set(true);
    });
    this.evaluateMood(); // coach mood based on initial data
  }


  /**
   * Simple heuristic to set emotional state:
   * - 'angry' if any meal is over limit
   * - 'proud' if nothing is over limit and user has logged a decent amount of progress (>=70%)
   * - 'motivating' otherwise
   */
  evaluateMood() {
    const meals = this.meals();
    const anyOver = meals.some(m => this.isOverLimit(m));
    if (anyOver) {
      this.coachAngry.set(true);
      this.coachMood.set('angry');
      return;
    }

    this.coachAngry.set(false);

    const totalCurrent = meals.reduce((s, m) => s + m.currentKcal, 0);
    const totalLimit = meals.reduce((s, m) => s + m.limitKcal, 0) || 1;
    const progress = totalCurrent / totalLimit;

    if (progress >= 0.7 && totalCurrent > 0) {
      this.coachMood.set('proud');
    } else {
      this.coachMood.set('motivating');
    }
  }




  isOverLimit(meal: Meal): boolean {
    return meal.currentKcal > meal.limitKcal;
  }

  getProgressBarWidth(meal: Meal): number {
    if (meal.limitKcal === 0) return 0;
    const percentage = (meal.currentKcal / meal.limitKcal) * 100;
    return Math.min(percentage, 100);
  }

  onMealClick(meal: Meal) {
    console.log('Meal clicked:', meal.name);
    this.expandedMeal.set(meal.name);
    // re-evaluate mood in case user interaction changes state
    this.evaluateMood();
  }
}
