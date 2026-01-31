import { Component, ChangeDetectionStrategy, input } from '@angular/core';

export interface Macro {
  name: string;
  value: number;
  goal: number;
  colorClass: 'primary' | 'white/40';
}
@Component({
  selector: 'app-macros',
  imports: [],
  templateUrl: './macros.html',
  styleUrl: './macros.css',
})
export class Macros {

  macros = input.required<Macro[]>();

  getMacroProgress(macro: Macro): number {
    if (macro.goal === 0) return 0;
    return Math.min(100, (macro.value / macro.goal) * 100);
  }
}
