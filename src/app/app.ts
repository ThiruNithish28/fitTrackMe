import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './header/header';
import { IntroPage } from './intro-page/intro-page';
import { CommonModule } from '@angular/common';
import { DailySummary } from './daily-summary/daily-summary';
import { DailyLog } from './daily-log/daily-log';

@Component({
  selector: 'app-root',
  // imports: [ Header, IntroPage,DailySummary,DailyLog,CommonModule],
  imports: [ DailySummary,DailyLog,CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('fitTrackMe');
}
