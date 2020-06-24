

import { NgForm, FormControl, Validators } from '@angular/forms';

import { Component, OnInit } from '@angular/core';

import { FormGroup } from '@angular/forms';

import { ToastrService } from 'ngx-toastr';

import { CourseService } from '../../services/course-services/course.service';

import { Observable } from 'rxjs/Observable';

import { Course } from '../../services/course-services/course.model';



@Component({

  selector: 'app-course',

  templateUrl: './course.component.html',

  styleUrls: ['./course.component.css'],

  providers: [CourseService]

})

export class CourseComponent implements OnInit {

  isLoading = false;

  form = new FormGroup({

    _id: new FormControl(),

    CourseName: new FormControl('', [

      Validators.required,

      Validators.minLength(3),

      Validators.maxLength(140)

    ]),

    CourseDesc: new FormControl('', [

      Validators.required,

      Validators.minLength(3),

      Validators.maxLength(500)

    ])

  });



  get CourseName() { return this.form.get('CourseName'); }



  get CourseDesc() { return this.form.get('CourseDesc'); }



  constructor(public courseService: CourseService, private toastr: ToastrService) { }



  ngOnInit() {

    this.resetForm();

    this.refreshCourseList();

  }



  selectedTechnology;

  ddlSelectedTechnology(obj) {

    this.selectedTechnology = obj;

  }



  ddlTechnology = [

    { TechnologyName: 'C#' },

    { TechnologyName: 'Asp.Net' },

    { TechnologyName: 'Python' },

    { TechnologyName: 'R' },

    { TechnologyName: 'Machine Learning' },

  ];



  resetForm(form?: NgForm) {

    if (form != null)

      form.reset();

    this.refreshCourseList();

    this.courseService.selectedCourse = {

      _id: "",

      CourseName: "",

      CourseDesc: "",

      TechnologyName: ""

    }

    this.selectedTechnology = "";

  }



  onSubmit(form?: NgForm) {
    this.isLoading = true
    if (form.value._id === '' || form.value._id === null) {

      form.value.TechnologyName = this.selectedTechnology['TechnologyName'];



      this.courseService.postCourse(form.value)

        .subscribe(res => {

          this.resetForm(form);

          this.refreshCourseList();

          this.toastr.success('New Record Inserted');

        });

    }

    else {

      form.value.TechnologyName = this.selectedTechnology['TechnologyName'];

      this.courseService.putCourse(form.value)

        .subscribe((res) => {

          this.resetForm(form);

          this.refreshCourseList();

          this.toastr.success('Updated successfully');



        });

    }

  }



  refreshCourseList() {
    this.isLoading = true
    this.courseService.getCourseList().subscribe((res) => {
      this.isLoading = false
      this.courseService.courseList = res as Course[];

    });

  }



  onEdit(course: Course) {
    this.courseService.selectedCourse = course;
    this.selectedTechnology = course;
    this.selectedTechnology.TechnologyName = course.TechnologyName;
  }



  onDelete(_id: string, form: NgForm) {

    if (confirm('Are you sure to delete this record ?') == true) {
      this.isLoading = true
      this.courseService.deleteCourse(_id).subscribe((res) => {

        this.refreshCourseList();

        this.resetForm(form);

        this.toastr.info('Record Deleted Succesfully');

      });

    }

  }

}

