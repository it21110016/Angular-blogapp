import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class BlogService {

  // private baseUrl = 'https://blog-app-6vki.onrender.com/api/v1/blogs';
  private baseUrl = 'http://localhost:5000/api/v1/blogs';

  constructor(private http: HttpClient) { }

  private getHeaders(): HttpHeaders {

    const token = localStorage.getItem('token');
    return new HttpHeaders({ 'Authorization': `${token}` });

  }

  addBlog(blog: any): Observable<string> {

    //   // Get the token from wherever you've stored it after login
    // const token = localStorage.getItem('token'); // Replace with the actual JWT token

    // // Set the headers with the Authorization token
    // const headers = { 'Authorization': `${token}` };

    const headers = this.getHeaders();

    return this.http.post(this.baseUrl, blog, { headers, responseType: 'text' }).pipe(

      map(response => {
        if (response === 'blog added successfully') {
          return response;
        } else {
          throw new Error('Unexpected response');
        }
      }),
      catchError(error => {
        alert('Invalid token. Please log in again.');
        throw error;
      })
    );
  }

  updateBlog(id: string, blog: any): Observable<any> {

    const headers = this.getHeaders();

    return this.http.put(`${this.baseUrl}/${id}`, blog, { headers, responseType: 'text' }).pipe(

      map(response => {
        if (response === 'blog updated successfully') {
          return response;
        } else {
          throw new Error('Unexpected response');
        }
      }),
      catchError(error => {
        alert('Invalid token. Please log in again.');
        throw error;
      })
    );
  }

  deleteBlog(id: string): Observable<string> {

    const headers = this.getHeaders();

    return this.http.delete(`${this.baseUrl}/${id}`, { headers, responseType: 'text' }).pipe(

      map(response => {
        if (response === 'blog deleted successfully') {
          return response;
        } else {
          throw new Error('Unexpected response');
        }
      }),
      catchError(error => {
        alert('Invalid token. Please log in again.');
        throw error;
      })
    );
  }

  getBlogs(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl);
  }

  getBlogById(id: string): Observable<any> {

    const headers = this.getHeaders();

    return this.http.get<any>(`${this.baseUrl}/${id}`, { headers }).pipe(

      catchError(error => {
        alert('Invalid token. Please log in again.');
        throw error;
      })
    );
  }
}
