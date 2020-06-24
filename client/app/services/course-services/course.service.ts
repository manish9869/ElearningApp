import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { Course } from './course.model';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  selectedCourse: Course;
  courseList : Course[];

  private url = 'http://localhost:3000/Course';
  constructor(private http : HttpClient) { }

  postCourse(course: Course){
    return this.http.post(this.url,course);
  }

  getCourseList(){
   return this.http.get(this.url);
   }

   
  getSingleCourse(_id: string){
    return this.http.get(this.url + `/${_id}`);
    }

   getCourseDetail(_id: string){
    return this.http.get(this.url + `/${_id}`);
    }

   putCourse(course: Course) {
    return this.http.put(this.url + `/${course._id}`, course);
  }

  deleteCourse(_id: string) {
    return this.http.delete(this.url + `/${_id}`);
  }
 
}
