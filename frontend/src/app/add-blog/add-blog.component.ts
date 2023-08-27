import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BlogService } from '../blog.service';

@Component({
  selector: 'app-add-blog',
  templateUrl: './add-blog.component.html',
  styleUrls: ['./add-blog.component.css']
})

export class AddBlogComponent implements OnInit {

  blog: any = {}; // Initialize an empty blog object

  constructor(private blogService: BlogService, private router: Router) { }

  ngOnInit() { }

  submitForm(data: any) {
    // debugger
    if ((data.author == "") || (data.description == "") || (data.name == "")) {
      // console.log("author is empty!");
      alert("Please fill required fields!")
      return;
    }
    this.blogService.addBlog(data).subscribe(
      () => {
        // After successful submission, navigate back to the home page
        this.router.navigate(['/']);
      }
    );
  }

}