import { Component } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent {
  email: string = '';
  password: string = '';

  constructor(private authService: AuthService) { }

  login() {
    if (!this.email || !this.password) {
      alert("Please fill in both email and password fields");
      return;
    }

    const loginObserver = {
      next: (loggedIn: boolean) => {
        if (loggedIn) {
          // Redirect to the home page or another page upon successful login
          // For example, this.router.navigate(['/']);
        } else {
          // Handle failed login (display error message, etc.)
          alert("Invalid email or password");
        }
      },
      error: (error: any) => {
        alert("An error occurred during login");
      }
    };

    this.authService.login(this.email, this.password).subscribe(loginObserver);
  }

}
