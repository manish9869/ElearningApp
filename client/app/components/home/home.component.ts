import { Component, OnInit } from '@angular/core';
import { BlogService } from '../../services/blog-services/blog.service';
import { Blog } from '../../services/blog-services/blog.model';
import { CourseService } from '../../services/course-services/course.service';
import { Course } from '../../services/course-services/course.model';
import { ClientRegisterService } from '../../services/client-service/client-register.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(public blogService: BlogService, public courseService: CourseService, public clientRegisterService: ClientRegisterService) { }

isLogin;
login;
  ngOnInit() {

    localStorage.removeItem("isReload");
    this.isLogin= this.clientRegisterService.loginCheck();
    this.blogsList();
    this.coursesList();
  }

  blogList;
  courseList;

  blogsList() {
    this.blogList = this.blogService.getTop5BlogList(2).subscribe((res) => {
      this.blogService.blogList = res as Blog[];
    });
  }

  coursesList() {
    this.courseService.getCourseList().subscribe((res) => {
      this.courseService.courseList = res as Course[];
    });
  }
}

