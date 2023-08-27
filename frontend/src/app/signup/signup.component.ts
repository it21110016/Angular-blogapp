import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
// import { UserService } from '../user.service'; // Create UserService similar to BlogService
import { AuthService } from '../auth.service';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})

export class SignupComponent implements OnInit {

  user: any = {}; // Initialize an empty user object

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() { }

  submitForm() {
    if (!this.user.firstName || !this.user.lastName || !this.user.email || !this.user.password) {
      alert("Please fill all required fields");
      return;
    }

    if (!this.isValidEmail(this.user.email)) {
      alert("Invalid email format");
      return;
    }

    const signUpObserver = {
      next: () => {
        // After successful signup, navigate to the home page or login page
        this.router.navigate(['/login']); // Redirect to login page
      },
      error: (error: any) => {
        console.log('Error:', error);
        // Handle error, e.g., display error message to the user
      }
    };

    this.authService.signUp(this.user).subscribe(signUpObserver);
  }

  // Helper function to check for a valid email format
  isValidEmail(email: string): boolean {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailRegex.test(email);
  }

}
