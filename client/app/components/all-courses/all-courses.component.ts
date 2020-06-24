import { Component, OnInit } from '@angular/core';
import { CourseService } from '../../services/course-services/course.service';
import { Course } from '../../services/course-services/course.model';

@Component({
  selector: 'app-all-courses',
  templateUrl: './all-courses.component.html',
  styleUrls: ['./all-courses.component.css']
})
export class AllCoursesComponent implements OnInit {

  constructor(public courseService: CourseService) { }

  ngOnInit() {
    this.coursesList();
  }
  coursesList() {
    this.courseService.getCourseList().subscribe((res) => {
      this.courseService.courseList = res as Course[];
    });
  }

}
