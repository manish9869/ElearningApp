import { Component, OnInit } from '@angular/core';
import { ChapterService } from '../../services/chapter-services/chapter.service';
import { TopicService } from '../../services/topic-service/topic.service';
import { CourseService } from '../../services/course-services/course.service';
import { FormGroup, FormControl, Validators, NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Topic } from '../../services/topic-service/topic.model';
import { Course } from '../../services/course-services/course.model';
import { Chapter } from '../../services/chapter-services/chapter.model';

@Component({
  selector: 'app-topic',
  templateUrl: './topic.component.html',
  styleUrls: ['./topic.component.css'],
  providers: [CourseService, ChapterService, TopicService]
})
export class TopicComponent implements OnInit {
  selectedCourse: {};
  submitClicked = true;
  selectedChapter: {};
  form = new FormGroup({
    _id: new FormControl(),
    CourseID: new FormControl(),
    ChapterID: new FormControl(),
    TopicName: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(500)
    ]),
    TopicDesc: new FormControl('', [
      Validators.minLength(3),
      //Validators.maxLength(1000)
    ]),
    VideoURL: new FormControl('', [
      
      Validators.minLength(3),
      Validators.maxLength(1000)
    ]),
    Serial: new FormControl('', [
      Validators.required,
    ]),
    VideoLength: new FormControl('', [
    
    ])

  });

  get CourseID() { return this.form.get('CourseID'); }

  get ChapterID() { return this.form.get('ChapterID'); }

  get TopicName() { return this.form.get('TopicName'); }

  get TopicDesc() { return this.form.get('TopicDesc'); }

  get VideoURL() { return this.form.get('VideoURL'); }

  get Serial() { return this.form.get('Serial'); }

  get VideoLength() { return this.form.get('VideoLength'); }


  constructor(public topicService: TopicService, public courseService: CourseService, public chapterService: ChapterService, private toastr: ToastrService) { }

  courseList;
  chapterList;

  ngOnInit() {
    this.courseService.getCourseList().subscribe((res) => {
      this.courseList = res as Course[];
    })
    // this.list=  this.chapterService.getChapterList().subscribe((res) => {
    //           this.chapterList =  res as Chapter[];})

    this.resetForm();
    this.refreshTopicList();
  }
  resetForm(form?: NgForm) {
    if (form != null)
      form.reset();
    this.topicService.selectedTopic = {
      _id: "",
      CourseID: "",
      ChapterID: "",
      TopicName: "",
      TopicDesc: "",
      VideoURL: "",
      Serial: null,
      VideoLength: ""
    }

    this.selectedCourse = "";
    this.selectedChapter = {};

    this.refreshTopicList();
  }
  list;

  courseSelectedValue(obj) {
    this.selectedCourse = obj;
    this.list = this.chapterService.getChapterListById(this.selectedCourse['_id']).subscribe((res) => {
      this.chapterList = res as Chapter[];

      //console.log(this.chapterList);
    });
  }

  chapterSelectedValue(obj) {
    this.selectedChapter = obj;

  }


  refreshTopicList() {
    this.topicService.getTopicList().subscribe((res) => {
      this.topicService.topicList = res as Topic[];
    });
  }


  saveData(form?: NgForm) {
    this.submitClicked = true
    if (!this.selectedChapter['_id'] || !this.selectedCourse['_id']) {
      return;
    }
    if (form.value._id === '' || form.value._id === null) {
      form.value.CourseID = this.selectedCourse['_id'];
      form.value.ChapterID = this.selectedChapter['_id'];
      this.topicService.postTopic(form.value)
        .subscribe(res => {
          this.resetForm(form);
          this.refreshTopicList();
          this.toastr.success('New Record Inserted');
          this.submitClicked = false
        });
    }
    else {
      form.value.CourseID = this.selectedCourse['_id'];
      form.value.ChapterID = this.selectedChapter['_id'];
      this.topicService.putTopic(form.value)
        .subscribe((res) => {
          this.resetForm(form);
          this.refreshTopicList();
          this.toastr.success('Updated successfully');
          this.submitClicked = false
        });
    }
  }


  onEdit(topic: Topic) {
    this.topicService.selectedTopic = topic;


    this.courseService.getSingleCourse(topic.CourseID).subscribe((res) => {
      this.selectedCourse = res as Course[];
      //console.log(this.selectedCourse);
      this.courseSelectedValue(this.selectedCourse);

    });
   
    this.selectedChapter = topic.ChapterID;
  }

  onDelete(_id: string, form: NgForm) {
    if (confirm('Are you sure to delete this record ?') == true) {
      this.topicService.deleteTopic(_id).subscribe((res) => {
        this.refreshTopicList();
        this.resetForm(form);
        this.toastr.info('Record Deleted Succesfully');
      });
    }
  }

}
