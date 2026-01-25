import { Component, Input, OnChanges, SimpleChanges, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserDetails } from '../../dto/UserDetails';
import { CalendarDay } from '../../dto/CalendarDay';

@Component({
  selector: 'app-daily-summary',
  imports: [CommonModule],
  templateUrl: './daily-summary.html',
  styleUrl: './daily-summary.css',
})
export class DailySummary {
  targetCalories: number = 2000;
  eatenCalories: number = 1000;

  targetProtein: number = 77;
  eatenProtein: number = 40;

  targetCarbs: number = 77;
  eatenCarbs: number = 30;

  targetFat: number = 20;
  eatenFat: number = 77;

 userDetails: UserDetails = {
  age: 18,
  weight: 0,
  gender: 'male',
  goal: '',
  targetProtein: 40,
  eatenProtein: 40,
  targetCarbs: 70,
  eatenCarbs: 40,
  targetFat: 30,
  eatenFat: 20,
  targetCalories: 2000,
  eatenCalories: 1230
};


  totalTicks = 24; // for 180 degree half-circle the 30 bar is good enough
  ticks = signal<any[]>([1, 2]);

  // dateDay list 
  calendarDays = signal<CalendarDay[]>([]);
  constructor() {
    this.generateTicks();
    this. getNextFiveDateDay();
  }

  ngOnChanges() {
    this.generateTicks();
  }

  remainingCalories = computed(() => Math.max(0, this.userDetails.targetCalories - this.userDetails.eatenCalories));
  progressPercentage = computed(() => {
    return Math.min(100, (this.userDetails.eatenCalories / this.userDetails.targetCalories) * 100);
  });

  // for show the bars calucation
  generateTicks() {
    const tickArray = [];
    // we want semi circle so -90 to 90 [ which 180 degree]
    const startAngle = -90;
    const endAngle = 90;
    const range = endAngle - startAngle; //180 degree

    // steps : 0 to 29 -We need 30 ticks, so we loop from i = 0 to i = 29.
    const step = range / (this.totalTicks - 1); //If we have 180 degrees and 30 ticks, each tick is about 6 degrees apart.

    // calculate how many ticks should be "active" (coloure)
    const activeCount = Math.round((this.progressPercentage() / 100) * this.totalTicks);

    // dynamically set the rotation angle, and determine which bar is active  for the svg
    for (let i = 0; i < this.totalTicks; i++) {
      const angle = startAngle + i * step;
      tickArray.push({
        rotation: `rotate(${angle},150,150)`,
        active: i < activeCount,
      });
    }

    this.ticks.set(tickArray); // set the final one to signal variable
  }

  getNextFiveDateDay(){

    const today = new Date();
    const currnetDayOfWeek = today.getDay();

    const startOfWeek = new Date(today); 
    // StartDate = today Date - [0,1,2,3,4,5,6] day number, (which is the gap between today and startDate of week)
    startOfWeek.setDate(today.getDate() - currnetDayOfWeek); 
    
    const days: CalendarDay[] = [];
    const dayLabels = ["S","M","T","W","T","F","S"];
    for ( let i=0;i<7; i++){
      const dateIter = new Date(startOfWeek);
      dateIter.setDate(startOfWeek.getDate() +i);

      const isToday = dateIter.getDate() === today.getDate() && dateIter.getMonth() === today.getMonth() ;
      
      days.push({
        dayName: dayLabels[i],
        dayNumber: dateIter.getDate(),
        fullDate: dateIter.toLocaleDateString(),
        isToday: isToday
      });
      this.calendarDays.set(days);
    }

  }
}
