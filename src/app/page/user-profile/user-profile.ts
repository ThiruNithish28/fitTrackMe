import { Component } from '@angular/core';
import { MenuGlassCard } from "../../commonComponent/menu-glass-card/menu-glass-card";
import { UserDetails } from '../../../dto/UserDetails';
import { Router, RouterLink } from "@angular/router";

@Component({
  selector: 'app-user-profile',
  imports: [MenuGlassCard, RouterLink],
  templateUrl: './user-profile.html',
  styleUrl: './user-profile.css',
})
export class UserProfile {

  userDetails!:UserDetails;
  
  constructor(private router: Router){

  }
  
  onSettingsClick(): void {
    console.log("Settings clicked");
    // Implement settings navigation or modal opening here
    this.router.navigate(['/settings']);
  }
}
