import { CommonModule } from '@angular/common';
import {
  Component,
  ElementRef,
  QueryList,
  ViewChild,
  ViewChildren,
  AfterViewInit,
} from '@angular/core';
import { UserDetails } from '../../dto/UserDetails';
import { CalculationEnginer } from '../services/calculation-enginer';

@Component({
  selector: 'app-intro-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './intro-page.html',
  styleUrls: ['./intro-page.css'],
})
export class IntroPage {
  // --- Data Sources ---
  ages: number[] = Array.from({ length: 83 }, (_, i) => i + 18); // 18 to 100
  weightNumbers: number[] = Array.from({ length: 180 }, (_, i) => i + 1);
  goals: any[] = [
    { name: 'Weight Loss', key: 'weight-loss' },
    { name: 'Maintain Weight', key: 'maintain' },
    { name: 'Grow Muscle', key: 'grow-muscle' },
    { name: 'Fat Loss', key: 'fat-loss' },
  ];
  genderList: string[] = ['Male', 'Female', 'Other'];

  // --- State Variables ---
  isIntroPage = true;
  isAgeEnterPage = false;
  isWeightEnterPage = false;
  isGenderEnterPage = false;
  isGoalEnterPage = false;

  selectedAge: number = 20; // Default selection
  selectedWeight: number = 0;

  userDetails: UserDetails;

  // --- View References ---
  @ViewChild('wheel') wheelContainer!: ElementRef;
  @ViewChildren('ageItem') ageItems!: QueryList<ElementRef>;
  private observer: IntersectionObserver | null = null;

  constructor(private _calaculationService: CalculationEnginer) {
    this.userDetails = {
      userName: '',
      email: '',
      age: 20,
      weight: 0,
      height: 0,
      gender: '',
      goal: '',
      targetProtein: 0,
      eatenProtein: 0,
      targetCarbs: 0,
      eatenCarbs: 0,
      targetFat: 0,
      eatenFat: 0,
      targetCalories: 0,
      eatenCalories: 0,
    };
  }

  // --- Navigation Logic ---
  onNext(currentEvent: string) {
    switch (currentEvent) {
      case 'intro':
        this.isIntroPage = false;
        this.isAgeEnterPage = true;
        // Wait for Angular to render the @if block, then setup the wheel
        setTimeout(() => this.initAgeWheel(), 0);
        break;

      case 'age':
        this.isAgeEnterPage = false;
        this.isWeightEnterPage = true;
        // Disconnect observer to save resources
        if (this.observer) this.observer.disconnect();
        break;

      case 'weight':
        this.isWeightEnterPage = false;
        this.isGenderEnterPage = true;
        break;

      case 'gender':
        this.isGenderEnterPage = false;
        this.isGoalEnterPage = true;
        break;

      case 'goal':
        // Submit logic here
        console.log('Finished!');
        break;
    }
  }

  // --- Age Wheel Logic ---
  initAgeWheel() {
    if (!this.wheelContainer) return;

    const options = {
      root: this.wheelContainer.nativeElement,
      rootMargin: '-45% 0px -45% 0px', // Active area is the exact horizontal center
      threshold: 0,
    };

    this.observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const val = entry.target.getAttribute('data-age');
          if (val) {
            // Run inside setTimeout to avoid ExpressionChangedAfterItHasBeenCheckedError
            setTimeout(() => {
              this.selectedAge = parseInt(val, 10);
            });
          }
        }
      });
    }, options);

    // Observe all age items
    this.ageItems.forEach((item) => this.observer?.observe(item.nativeElement));

    // Initial scroll to selected age
    this.scrollTo(this.selectedAge, 'auto');
  }

  scrollTo(age: number, behavior: ScrollBehavior = 'smooth') {
    const index = this.ages.indexOf(age);
    if (index > -1) {
      const element = this.ageItems.get(index);
      element?.nativeElement.scrollIntoView({ behavior: behavior, block: 'center' });
    }
  }

  // bmr calculation
  finalResultCalculation() {
    this._calaculationService.getTargetCalories(this.userDetails).subscribe((res) => {
      // handle response
    });
  }
}
