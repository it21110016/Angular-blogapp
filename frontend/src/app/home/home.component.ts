import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BlogService } from '../blog.service';
import { AuthService } from '../auth.service'; // Import the AuthService

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
  blogs: any[] = [];
  searchText: string = '';

  constructor(private blogService: BlogService, private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.fetchBlogs();
  }

  fetchBlogs() {
    this.blogService.getBlogs().subscribe((response) => {
      this.blogs = response;
    });
  }

  deleteBlog(id: string) {
    this.authService.isAuthenticated$().subscribe(isAuthenticated => {
      if (!isAuthenticated) {
        // User is not authenticated, show an alert
        alert('You must be logged in to delete a blog.');
      } else {
        this.blogService.deleteBlog(id).subscribe(
          () => {
            this.fetchBlogs(); // Refresh blogs on successful deletion
          }
        );
      }
    });
  }

  navigateToUpdate(id: string) {
    this.router.navigate(['/update-blog', id]);
  }

  navigateToView(id: string) {
    this.router.navigate(['/view-blog', id]);
  }
}
