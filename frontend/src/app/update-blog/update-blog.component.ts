import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BlogService } from '../blog.service';

@Component({
  selector: 'app-update-blog',
  templateUrl: './update-blog.component.html',
  styleUrls: ['./update-blog.component.css']
})

export class UpdateBlogComponent implements OnInit {
  blog: any = {};

  constructor(
    private route: ActivatedRoute,
    private blogService: BlogService,
    private router: Router
  ) { }

  ngOnInit() {
    const blogId = this.route.snapshot.paramMap.get('id');
    if (blogId) {
      this.fetchBlog(blogId);
    }
  }

  fetchBlog(id: string) {
    this.blogService.getBlogById(id).subscribe((response) => {
      this.blog = response;
    });
  }

  updateBlog() {
    this.blogService.updateBlog(this.blog._id, this.blog).subscribe(
      () => {
        this.router.navigate(['/']); // After successful update, navigate back to the home page
      }
    );
  }
}
