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

  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);

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

        const response = await this.http.get(`${this.baseUrl}/verify-token`, { headers }).toPromise();
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
