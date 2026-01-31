import { Component, ChangeDetectionStrategy, input } from '@angular/core';

@Component({
  selector: 'app-stat-card',
  imports: [],
  templateUrl: './stat-card.html',
  styleUrl: './stat-card.css',
})
export class StatCard {

  icon = input.required<string>();
  title = input.required<string>();
  value = input.required<string>();
  unit = input('');
  badgeText = input('');
  barData = input<number[] | null>(null);
  borderColor = input('border-green-400');
  borderSide = input('l'); // 'l' or 'r'
}
