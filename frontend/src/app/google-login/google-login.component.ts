import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-google-login',
  templateUrl: './google-login.component.html',
  styleUrls: ['./google-login.component.css']
})
export class GoogleLoginComponent {

  private baseUrl = 'http://localhost:5000/api/v1/users';

  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient, private router: Router, private authService: AuthService) {
  }

  ngOnInit() {
    // @ts-ignore
    google.accounts.id.initialize({
      client_id: "87702682850-o2vvulmvnn5tmc6mdckf3pq3o92i6bhg.apps.googleusercontent.com",
      callback: this.authService.handleCredentialResponse.bind(this),
      auto_select: false,
      cancel_on_tap_outside: true,
  
    });
    // @ts-ignore
    google.accounts.id.renderButton(
    // @ts-ignore
    document.getElementById("google-button"),
      { theme: "outline", size: "large", width: "100%" }
    );
    // @ts-ignore
    google.accounts.id.prompt((notification: PromptMomentNotification) => {});
  }

  async handleCredentialResponse(response: any) {
    if (response) {
      const googleIdToken = response.credential;
      await this.authService.handleGoogleLogin(googleIdToken);
      this.router.navigate(['/']); // Redirect after successful Google login
    }
  }
  
}
