import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  // private baseUrl = 'https://blog-app-6vki.onrender.com/api/v1/users';
  private baseUrl = 'http://localhost:5000/api/v1/users';

   isAuthenticatedSubject = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient, private router: Router) {
    this.checkToken();
  }

  // signUp(user: any): Observable<any> {
  //   return this.http.post(`${this.baseUrl}/signup`, user);
  // }

  signUp(user: any): Observable<any> {

    return this.http.post(`${this.baseUrl}/signup`, user).pipe(
      // catchError(error => {
      //   console.error('Signup error:', error);
      //   return throwError(error);
      // })
    );
  }

  login(email: string, password: string): Observable<boolean> {

    const data = { email, password };

    return this.http.post(`${this.baseUrl}/login`, data).pipe(

      map((response: any) => {
        localStorage.setItem('token', response.token);
        this.isAuthenticatedSubject.next(true);
        this.router.navigate(['/']); // Navigate to the home page
        return true;
      }),
      catchError(error => {
        console.error('Login error:', error);
        return of(false);
      })

    );
  }

  async handleCredentialResponse(response: any) {
    // Here will be your response from Google.
    // console.log(response);
  
    // Check if the response contains the user's information (you may need to adjust this based on the response format)
    if (response) {
      const googleIdToken = response.credential;
  
      // Send the Google ID token to your server for verification and token generation
      try {
        const tokenResponse: any = await this.http.post(
          `${this.baseUrl}/glogin`, // Replace with your server's endpoint for token generation
          { googleIdToken } // Send the Google ID token in the request body
        ).toPromise();

        // Check if the server responded with a valid token
        if (tokenResponse && tokenResponse.token) {
          // Store the token locally (e.g., in local storage)
          localStorage.setItem('token', tokenResponse.token);
  
          // Update your application's authentication state
          this.isAuthenticatedSubject.next(true);
  
          // Redirect the user or perform any other actions as needed
          this.router.navigate(['/']); // Navigate to the home page
        } else {
          // Handle the case where the server did not provide a valid token
          console.error('Invalid token received from the server');
        }
      } catch (error) {
        // Handle any errors that occurred during the token generation process
        console.error('Error generating or receiving token:', error);
      }
    }
  }

  async handleGoogleLogin(googleIdToken: string): Promise<void> {
    try {
      const tokenResponse: any = await this.http.post(
        `${this.baseUrl}/glogin`,
        { googleIdToken }
      ).toPromise();
  
      if (tokenResponse && tokenResponse.token) {
        localStorage.setItem('token', tokenResponse.token);
        this.isAuthenticatedSubject.next(true);
      } else {
        console.error('Invalid token received from the server');
      }
    } catch (error) {
      console.error('Error generating or receiving token:', error);
    }
  }  

  logout(): void {
    localStorage.removeItem('token');
    this.isAuthenticatedSubject.next(false);
    this.router.navigate(['/login']); // Navigate to the login page
  }

  private async checkToken() {

    const token = localStorage.getItem('token');

    if (token) {
      try {
        const headers = new HttpHeaders({ 'Authorization': `${token}` });

        const response = await this.http.get(`${this.baseUrl}`, { headers }).toPromise();
        if (response) {
          this.isAuthenticatedSubject.next(true);
        } else {
          alert('Invalid token. Please log in again.');
          this.isAuthenticatedSubject.next(false);
        }
      } catch (error) {
        alert('Invalid token. Please log in again.');
        this.isAuthenticatedSubject.next(false);
      }
    }

  }

  isAuthenticated$(): Observable<boolean> {
    return this.isAuthenticatedSubject.asObservable();
  }
}
