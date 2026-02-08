import { Component, signal } from '@angular/core';
import { RobotCoach } from '../../commonComponent/robot-coach/robot-coach';
import { SettingSectionCard } from '../../commonComponent/setting-section-card/setting-section-card';
import { Title } from 'chart.js';

@Component({
  selector: 'app-settings',
  imports: [RobotCoach, SettingSectionCard],
  templateUrl: './settings.html',
  styleUrl: './settings.css',
})
export class Settings {

  isDarkMode = signal(true);

  mainSettingOptions = [
    {
      title: 'Fitness Goals',
      icon: 'target',
      hasToggle:false,
      action: () => console.log('Navigate to Fitness Goals')
    },
    {
      title: 'Training Intensity',
      icon: 'bolt',
      hasToggle:false,
      action: () => console.log('Navigate to Training Intensity')
    },
    {
      title: 'Workout Reminders',
      icon: 'notifications_active',
      hasToggle:false,
      action: () => console.log('Navigate to Workout Reminders')
    },
  ];


  nutritionSettingOptions = [
    {
      title: 'Macro Targets',
      icon: 'nutrition',
      hasToggle:false,
      action: () => console.log('Navigate to Macro Targets')
    },
    {
      title: 'Meal Timing',
      icon: 'schedule',
      hasToggle:false,
      action: () => console.log('Navigate to Meal Timing')
    }
  ];

  appSettingsOptions = [
    {
      id: 'dark',
      title: 'Dark Mode',
      icon: 'dark_mode',
      hasToggle: true,
      toggleState: this.isDarkMode,
      toggleFunction: () => this.toggleDarkMode()
    },
    {
      title: 'Measurement Units',
      icon: 'straighten',
      hasToggle:false,
      action: () => console.log('Navigate to Measurement Units')
    },
    {
      title: 'Privacy & Data',
      icon: 'privacy_tip',
      hasToggle:false,
      action: () => console.log('Navigate to Privacy Settings')
    }
  ];

  toggleDarkMode() {
    this.isDarkMode.update(value => !value);
    // In a real app, you would also persist this setting and change 
    // the class on the html element to reflect the theme change.
  }
}
