
import { FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CourseService } from '../../services/course-services/course.service';
import { Observable } from 'rxjs/Observable';
import { Course } from '../../services/course-services/course.model';
import { ChapterService } from '../../services/chapter-services/chapter.service';
import { Chapter } from '../../services/chapter-services/chapter.model';

@Component({
  selector: 'app-chapter',
  templateUrl: './chapter.component.html',
  styleUrls: ['./chapter.component.css'],
  providers: [CourseService,ChapterService]
})
export class ChapterComponent implements OnInit {
  selectedCourse: {};
  courseList;
  chapterList;


 formData = {
   _id: "",
   CourseID : "",
   ChapterName: "",
   ChapterDesc: "",
   Serial: null
 };


  constructor(public courseService: CourseService, public chapterService: ChapterService, private toastr: ToastrService) { }


  ngOnInit() {
    this.courseService.getCourseList().subscribe((res) => {
      this.courseList =  res as Course[];})
      this.refreshChapterList();

    }

  selectedValue(obj){
  return this.selectedCourse = obj;
}

onClickSubmit(){

  this.formData = {
    _id: this.formData._id,
    CourseID : this.selectedCourse['_id'],
    ChapterName: this.formData.ChapterName,
    ChapterDesc: this.formData.ChapterDesc,
    Serial: this.formData.Serial
  };

 this.saveData();
}

  resetForm(formData){
  if(formData != null || formData != '' )
 // formData.reset();
   this.formData= {
         _id: '',
      CourseID: '',
      ChapterName: '',
      ChapterDesc: '',
      Serial: null
    
  }
  this.selectedCourse= '';
  this.refreshChapterList();
}

saveData() {


  if(this.formData._id === '' || this.formData._id === null) {
    delete this.formData._id;
    this.chapterService.postChapter(this.formData)
    .subscribe(res => {
      this.resetForm(this.formData);
    this.refreshChapterList();
    this.toastr.success('New Record Inserted');
    });
  } else{
    this.chapterService.putChapter(this.formData)
    .subscribe((res) => {
      this.resetForm(this.formData);
      this.refreshChapterList();
      this.toastr.success('Updated successfully');
    });
  }
  }

refreshChapterList(){
  this.chapterService.getChapterList().subscribe((res) => {
  this.chapterService.chapterList = res as Chapter[];
  //console.log( this.chapterService.chapterList);
});
}


onEdit(chapter: Chapter) {
  //this.chapterService.selectedChapter = chapter;
  this.formData._id = chapter._id;
  this.formData.ChapterName = chapter.ChapterName;
  this.formData.ChapterDesc = chapter.ChapterDesc;
  this.formData.CourseID = chapter.CourseID;
  this.selectedCourse = chapter.CourseID;
  this.formData.Serial= chapter.Serial;
  
}

onDelete(_id: string) {
  if (confirm('Are you sure to delete this record ?') == true) {
    this.chapterService.deleteChapter(_id).subscribe((res) => {
      this.refreshChapterList();
      this.resetForm(this.formData);
      this.toastr.info('Record Deleted Succesfully');
    });
  }
}
}
