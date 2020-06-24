import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/filter';
import { CoursesService } from '../../services/courses/courses.service';
import { ChapterService } from '../../services/chapter-services/chapter.service';
import { Chapter } from '../../services/chapter-services/chapter.model';

import { Course } from '../../services/course-services/course.model';
import { CourseService } from '../../services/course-services/course.service';
import { TopicService } from '../../services/topic-service/topic.service';
import { Topic } from '../../services/topic-service/topic.model';


@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit {

  @Input('title') title: string;
  isExpanded: boolean = false;

  constructor(private route: ActivatedRoute, public chapterService: ChapterService, public courseService: CourseService, public topicService: TopicService) { }

  isExpand: boolean = false;
  toggle(obj) {
    if (this.isExpanded == null || this.isExpand == false) {
      this.isExpanded = !this.isExpanded;
      this.isExpanded = obj;
      this.isExpand = true;
      return
    } else {
      this.isExpand = false;
      this.isExpanded = !this.isExpanded;
    }
  }

  courseId: string;
  ngOnInit() {
    localStorage.removeItem("isReload");
    this.route.queryParams
      .filter(params => params.course)
      .subscribe(params => {
        this.courseId = params.course;
      });
    this.getSingleCourseDetail(this.courseId);
    //this.loadSingleChapterList(this.courseId);
    this.getTopicList(this.courseId);
  }
  chapterList;

  loadSingleChapterList(courseId) {
    this.chapterService.getChapterListById(courseId).subscribe((res) => {
      this.chapterList = res as Chapter[];
    });

  }

  courseDetail;
  getSingleCourseDetail(courseId) {
    this.courseService.getCourseDetail(courseId).subscribe((res) => {
      this.courseDetail = res as Course[];

    });

  }
  topicList;
  selectChap;
  getTopicList(courseId) {
    this.chapterService.getTopicListByChapter(courseId).subscribe((res) => {
      this.chapterList = res as Chapter[]
    });

  }

  setIcon(obj) {
    if (obj == "" || obj == null) {
      return "fa fa-file-alt";
    } else {
      return "fa fa-video";
    }
  }
  checkIsVideo(obj) {
    if (obj == "" || obj == null) {
      return false;
    } else {
      return true;
    }
  }
}
