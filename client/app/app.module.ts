import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { DatepickerModule, BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { AppComponent } from './app.component';
import { CourseComponent } from './components/course/course.component';
import { ChapterComponent } from './components/chapter/chapter.component';
import { TopicComponent } from './components/topic/topic.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { BlogComponent } from './components/blog/blog.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { BlogsComponent } from './components/blogs/blogs.component';
import { ContactComponent } from './components/contact/contact.component';
import { CoursesComponent } from './components/courses/courses.component';
import { LoginComponent } from './components/login/login.component';
import { ClientRegisterComponent } from './components/client-register/client-register.component';
import { AccordionModule } from 'ngx-bootstrap/accordion';
import { SingleBlogComponent } from './components/single-blog/single-blog.component';
import { ClientFooterComponent } from './components/client-footer/client-footer.component';

import { SingleTopicComponent } from './components/single-topic/single-topic.component';
import { RegisteredUsersComponent } from './components/registered-users/registered-users.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { AllCoursesComponent } from './components/all-courses/all-courses.component';
import { ForgotpasswordComponent } from './components/forgotpassword/forgotpassword.component';
import { DemoTestComponent } from './components/demo-test/demo-test.component';
// import { SafePipeModule } from 'safe-pipe';
// import { EmbedVideo } from 'ngx-embed-video';
@NgModule({
  declarations: [

    AppComponent,
    CourseComponent,
    ChapterComponent,
    TopicComponent,
    DashboardComponent,
    BlogComponent,
    NavbarComponent,
    HomeComponent,
    BlogsComponent,
    ContactComponent,
    CoursesComponent,
    LoginComponent,
    ClientRegisterComponent,
    SingleBlogComponent,
    ClientFooterComponent,
    SingleTopicComponent,
    RegisteredUsersComponent,
    PagenotfoundComponent,
    AllCoursesComponent,
    ForgotpasswordComponent,
    DemoTestComponent,

  ],
  imports: [
    // SafePipeModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    HttpClientModule,
    BrowserAnimationsModule,
    // EmbedVideo.forRoot(),
    AccordionModule.forRoot(),
    BsDropdownModule.forRoot(),
    BsDatepickerModule.forRoot(),
    DatepickerModule.forRoot(),
    ToastrModule.forRoot(),
    RouterModule.forRoot([
      {
        path: '',
        component: HomeComponent
      },
      {
        path: 'dashboard',
        component: DashboardComponent
      },
      {
        path: 'course',
        component: CourseComponent
      },
      {
        path: 'chapter',
        component: ChapterComponent
      },
      {
        path: 'topic',
        component: TopicComponent
      },
      {
        path: 'forgotpassword',
        component: ForgotpasswordComponent
      },
      {
        path: 'blog',
        component: BlogComponent
      },
      {
        path: 'users',
        component: RegisteredUsersComponent
      },
      {
        path: 'home',
        component: HomeComponent
      },
      {
        path: 'blogs',
        component: BlogsComponent
      },
      {
        path: 'courses',
        component: CoursesComponent
      },
      {
        path: 'contact',
        component: ContactComponent
      },
      {
        path: 'login',
        component: LoginComponent
      },
      {
        path: 'register',
        component: ClientRegisterComponent
      },
      {
        path:  'singleblog',
        component: SingleBlogComponent
      },
      {
        path: 'singletopic',
        component: SingleTopicComponent
      },
      {
        path: 'allcourses',
        component: AllCoursesComponent
      },
      { path: '**', component: PagenotfoundComponent }
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
