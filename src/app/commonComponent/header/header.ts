import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { filter } from 'rxjs';
@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
router: any;
constructor(private _router: Router, private location: Location){
  this._router.events.pipe(
    filter(event => event.constructor.name === "NavigationEnd")
  ).subscribe(() => {
    this.router = this._router.url.split('?')[0];
    console.log("Current Route in Header:", this.router);
  });
}

goBack(): void {
  // Prefer Location.back() for browser-like navigation; fallback to dashboard
  if (window.history.length > 1) {
    this.location.back();
  } else {
    this._router.navigate(['/dashboard']);
  }
}

}
