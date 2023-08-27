import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BlogService } from '../blog.service';

@Component({
  selector: 'app-view-blog',
  templateUrl: './view-blog.component.html',
  styleUrls: ['./view-blog.component.css']
})

export class ViewBlogComponent implements OnInit {
  blog: any = {};

  constructor(private route: ActivatedRoute, private blogService: BlogService) { }

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
}
