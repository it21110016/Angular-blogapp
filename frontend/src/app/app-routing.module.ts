import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { AddBlogComponent } from './add-blog/add-blog.component';
import { UpdateBlogComponent } from './update-blog/update-blog.component';
import { ViewBlogComponent } from './view-blog/view-blog.component';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';

import { AuthGuard } from './auth.guard';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'login', component: LoginComponent },
  { path: 'add-blog', component: AddBlogComponent, canActivate: [AuthGuard] },
  { path: 'update-blog/:id', component: UpdateBlogComponent, canActivate: [AuthGuard] },
  { path: 'view-blog/:id', component: ViewBlogComponent, canActivate: [AuthGuard] }
  // Add other routes if needed
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
