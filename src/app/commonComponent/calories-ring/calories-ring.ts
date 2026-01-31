import { Component, ChangeDetectionStrategy, input, computed } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-calories-ring',
  imports: [CommonModule],
  templateUrl: './calories-ring.html',
  styleUrl: './calories-ring.css',
})
export class CaloriesRing {

   caloriesLeft = input.required<number>();
  caloriesTotal = input.required<number>();

  radius = 110;
  circumference = 2 * Math.PI * this.radius;

  progress = computed(() => {
    const total = this.caloriesTotal();
    if (total === 0) return 0;
    const consumed = total - this.caloriesLeft();
    return Math.max(0, Math.min(100, (consumed / total) * 100));
  });

  strokeDashoffset = computed(() => {
    return this.circumference - (this.progress() / 100) * this.circumference;
  });
}
