import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
// import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { FilterPipe } from './filter.pipe';
import { AddBlogComponent } from './add-blog/add-blog.component';
import { UpdateBlogComponent } from './update-blog/update-blog.component';
import { ViewBlogComponent } from './view-blog/view-blog.component';
import { FooterComponent } from './footer/footer.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { GoogleLoginComponent } from './google-login/google-login.component';

// const appRoutes: Routes = [
//   { path: '', component: HomeComponent },
//   { path: 'add-blog', component: AddBlogComponent },
//   { path: 'update-blog/:id', component: UpdateBlogComponent },
//   { path: 'view-blog/:id', component: ViewBlogComponent }
//   // Add other routes if needed
// ];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    FilterPipe,
    AddBlogComponent,
    UpdateBlogComponent,
    ViewBlogComponent,
    FooterComponent,
    NavbarComponent,
    SignupComponent,
    LoginComponent,
    GoogleLoginComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
    // RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
