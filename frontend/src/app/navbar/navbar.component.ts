import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  isLoggedIn: boolean = false; // Initialize with a default value

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    // Subscribe to the authentication status observable
    this.authService.isAuthenticated$().subscribe(isAuthenticated => {
      this.isLoggedIn = isAuthenticated; // Update the value based on authentication status
    });
  }

  logout(): void {
    this.authService.logout();
  }
}
