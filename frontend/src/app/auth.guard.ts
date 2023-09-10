import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service'; // Import your AuthService or the service you're using for authentication
import { take, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class AuthGuard {

  constructor(private authService: AuthService, private router: Router) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.authService.isAuthenticated$().pipe(
      take(1),
      map(isAuthenticated => {
        if (isAuthenticated) {
          return true; // Allow access to the route
        } else {
          // Check if there's a token in local storage
          const token = localStorage.getItem('token');
          if (token) {
            // Set isAuthenticated if token exists
            this.authService.isAuthenticatedSubject.next(true);
            return true;
          } else {
            // Redirect to login if neither isAuthenticated nor token exists
            this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
            return false;
          }
        }
      })
    );
  }  

}