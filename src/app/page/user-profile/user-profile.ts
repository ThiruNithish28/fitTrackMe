import { Component } from '@angular/core';
import { MenuGlassCard } from "../../commonComponent/menu-glass-card/menu-glass-card";
import { UserDetails } from '../../../dto/UserDetails';

@Component({
  selector: 'app-user-profile',
  imports: [MenuGlassCard],
  templateUrl: './user-profile.html',
  styleUrl: './user-profile.css',
})
export class UserProfile {

  userDetails!:UserDetails;
  
  
  onSettingsClick(): void {
    console.log("Settings clicked");
    // Implement settings navigation or modal opening here
  }
}
