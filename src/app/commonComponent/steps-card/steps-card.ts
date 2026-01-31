import { Component, ChangeDetectionStrategy, input } from '@angular/core';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-steps-card',
  imports: [CommonModule],
  templateUrl: './steps-card.html',
  styleUrl: './steps-card.css',
})
export class StepsCard {
  icon = input.required<string>();
  title = input.required<string>();
  steps = input.required<number>();
  goal = input.required<number>();
  streak = input.required<number>();
}
