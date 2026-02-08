import { Component, signal, ElementRef, viewChild, effect, computed, Input } from '@angular/core';

import Chart from 'chart.js/auto';
import { RobotCoach } from "../../commonComponent/robot-coach/robot-coach";
import { RulerInput } from "../../commonComponent/ruler-input/ruler-input";

interface WeightLog {
  date: string;
  time: string;
  condition: string;
  weight: number;
  change?: number;
  isPositiveChange?: boolean;
}


@Component({
  selector: 'app-weight-tracker',
  imports: [RobotCoach, RulerInput],
  templateUrl: './weight-tracker.html',
  styleUrl: './weight-tracker.css',
})
export class WeightTracker {
  @Input() title = '';
  chartContainer = viewChild<ElementRef>('chart');
  private chart: any;
  
  showWeightEntry = signal(false);
  isSetGoalEntry = signal(false);
  updateNewGoalWeight = signal<number | null>(null);
  coachMessage = signal<string>("Click 'Current' to log your weight! 🎯");
  modalCoachMessage = computed(() => {
    if (this.isSetGoalEntry()) {
      return "Let's set your target weight! 💪";
    }
    return "Ready to log today's weight? Just adjust the ruler! 📏";
  });
  integerPartOfWeight = computed(() => Math.floor(this.updateNewGoalWeight() ?? 0));
  decimalPartOfWeight = computed(() => {
    const value = this.updateNewGoalWeight() ?? 0;
    // use parentheses so modulo applies to the value, not the fallback
    const frac = Math.abs((value) % 1);
    return frac.toFixed(1).substring(1);
  });

  userWeightDetails = signal({
    currentWeight: 84.2,
    goalWeight: 82.0,
    weightChange: -1.2,
  });
/*
  historyLogs = signal<WeightLog[]>([
    {
      date: 'Today',
      time: '08:30',
      condition: 'Morning Fasted',
      weight: 84.2,
      change: -0.2,
      isPositiveChange: false,
    },
    {
      date: 'Oct 24',
      time: '07:15',
      condition: 'Weekly Check-in',
      weight: 84.4,
      change: 0.1,
      isPositiveChange: true,
    },
    {
      date: 'Oct 21',
      time: '08:45',
      condition: 'Morning Fasted',
      weight: 84.3,
      change: -0.5,
      isPositiveChange: false,
    },
    {
      date: 'Oct 17',
      time: '07:00',
      condition: 'Morning Fasted',
      weight: 84.8,
    },
     {
      date: 'Oct 14',
      time: '07:30',
      condition: 'Morning Fasted',
      weight: 85.1,
    },
  ]);
  */
 
  historyLogs = signal<WeightLog[]>([]);

  constructor() {
      effect(() => {
          const chartEl = this.chartContainer();
          if (chartEl) {
              this.renderChart(chartEl.nativeElement);
          }
      });
  }

  onWeightChange(newWeight: number): void {
    this.updateNewGoalWeight.set(newWeight);
  }

  updateWeight(amount: number) {
    this.updateNewGoalWeight.update(w => parseFloat(((w ?? 0) + amount).toFixed(1)));
  }
  

  openWeightEntry(entryType: 'current' | 'goal') {
    this.updateNewGoalWeight.set(this.historyLogs()[0]?.weight || 84.2);
    this.isSetGoalEntry.set(entryType === 'goal');
    this.showWeightEntry.set(true);
  }

  closeWeightEntry() {
     this.isSetGoalEntry.set(false);
    this.showWeightEntry.set(false);
  }

  logWeight() {
    const newWeight = this.userWeightDetails().currentWeight;
    const previousWeight = this.historyLogs()[0].weight;
    const change = parseFloat((newWeight - previousWeight).toFixed(1));

    const newLog: WeightLog = {
      date: 'Today',
      time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false }),
      condition: 'Manual Entry',
      weight: newWeight,
      change: change,
      isPositiveChange: change > 0
    };


    this.historyLogs.update(logs => [newLog, ...logs]);
    this.closeWeightEntry();
  }

  addFirstLog(): void {
    const now = new Date();
    const newLog: WeightLog = {
      date: 'Today',
      time: now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      condition: 'Morning Fasted',
      weight: this.userWeightDetails().currentWeight,
    };
    this.historyLogs.set([newLog, ...this.historyLogs()]);
  }

  private renderChart(container: HTMLCanvasElement): void {
    const data = [...this.historyLogs()].reverse();
    if (!data || data.length < 2) {
      return;
    }

    const weights = data.map(d => d.weight);
    const labels = data.map(d => d.date);
    const yMin = Math.min(...weights);
    const yMax = Math.max(...weights);
    const yPadding = (yMax - yMin) * 0.4 || 1;

    const ctx = container.getContext('2d');
    if (!ctx) {
        return;
    }
    const gradient = ctx.createLinearGradient(0, 0, 0, 160);
    gradient.addColorStop(0, 'rgba(48, 232, 122, 0.2)');
    gradient.addColorStop(1, 'rgba(48, 232, 122, 0)');

    if (this.chart) {
        this.chart.destroy();
    }

    this.chart = new Chart(container, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'Weight',
                data: weights,
                borderColor: '#30e87a',
                borderWidth: 3,
                tension: 0.4,
                pointRadius: 3,
                pointBackgroundColor: '#30e87a',
                pointBorderColor: 'transparent',
                pointHoverRadius: 5,
                fill: true,
                backgroundColor: gradient
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { display: false },
                tooltip: {
                    enabled: true,
                    backgroundColor: 'rgba(10, 12, 11, 0.85)',
                    titleColor: '#fff',
                    bodyColor: '#fff',
                    displayColors: false,
                    callbacks: {
                        label: (context: any) => `${context.parsed.y} kg`
                    }
                }
            },
            scales: {
                x: { display: false },
                y: {
                    display: false,
                    min: yMin - yPadding,
                    max: yMax + yPadding
                }
            }
        }
    });
  }
}
