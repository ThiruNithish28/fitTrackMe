import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
// import { Header } from './header/header';
import { IntroPage } from './intro-page/intro-page';
import { CommonModule } from '@angular/common';

import { ThemeService } from './services/theme';


@Component({
  selector: 'app-root',
  // imports: [ Header, IntroPage,DailySummary,DailyLog,CommonModule],
  imports: [CommonModule, RouterOutlet ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('fitTrackMe');
  themeService = inject(ThemeService);
}
