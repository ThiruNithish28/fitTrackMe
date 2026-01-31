import { Component, ChangeDetectionStrategy, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CaloriesRing as CaloriesRingComponent } from '../../commonComponent/calories-ring/calories-ring';
import { Macros as  MacrosComponent, Macro } from '../../commonComponent/macros/macros';
interface FuelLogItem {
  time: string;
  title: string;
  kcal: number;
  imageUrl: string;
  category: string;
}


@Component({
  selector: 'app-dashboard',
  imports: [
    CommonModule,
    CaloriesRingComponent,
    MacrosComponent,
  ],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard {
calories = signal({ left: 1240, total: 2500 });

  macros = signal<Macro[]>([
    { name: 'Prot', value: 165, goal: 200, colorClass: 'primary' },
    { name: 'Carb', value: 210, goal: 300, colorClass: 'white/40' },
    { name: 'Fat', value: 54, goal: 70, colorClass: 'white/40' }
  ]);
  
  hydration = signal({ value: 2.5, unit: 'L', progress: 65, badge: '+15%' });
  burnZone = signal({ value: 850, unit: 'kcal', barData: [25, 45, 100, 75] }); // percentages
  steps = signal({ count: 12430, goal: 15000, streak: 15 });

}
