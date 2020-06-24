import { isValid } from 'ngx-bootstrap/chronos/create/valid';
import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import 'rxjs/add/operator/filter';
import { DomSanitizer } from '@angular/platform-browser';
import { Chapter } from '../../services/chapter-services/chapter.model';
import { ChapterService } from '../../services/chapter-services/chapter.service';
import { CourseService } from '../../services/course-services/course.service';
import { TopicService } from '../../services/topic-service/topic.service';
import { Topic } from '../../services/topic-service/topic.model';
declare var $: any;
@Component({
  selector: 'app-single-topic',
  templateUrl: './single-topic.component.html',

  styleUrls: ['./single-topic.component.css']
})

export class SingleTopicComponent implements OnInit {
  @Input('title') title: string;
  isLoading = false;
  isExpanded: boolean;
  isExpand: boolean = false;
  VideoUrl;
  OgVideoUrl;
  courseId;
  topicId;
  isVideo: boolean = false;
  chapterList;
  topicList;
  topic;
  topicDesc;
  SelectedtopicName;
  hideNavbar = false;
  constructor(private route: ActivatedRoute, private sanitizer: DomSanitizer, public chapterService: ChapterService, public courseService: CourseService, public topicService: TopicService, private router: Router) {

  }

  ngOnInit() {
    if (!localStorage.isReload) {
      this.isLoading = true;
      localStorage.isReload = 'true'
      window.location.reload()
    } else {
      this.route.queryParams
        .subscribe(params => {
          this.OgVideoUrl = params.VideoURL;
          this.courseId = params.courseId;
          this.topicId = params.TopicID;
          this.VideoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.VideoUrl);
          this.SelectedtopicName = params.TopicName;
        });
      if (this.OgVideoUrl == null || this.OgVideoUrl == "") {
        this.isVideo = false;
        this.isLoading= true;
        this.getTopicList(this.courseId);

        this.topicService.getTopicListById(this.topicId).subscribe((res) => {
          this.isLoading = false;
          this.topic = res as Topic[]
          this.topicDesc = this.topic.TopicDesc;
          this.SelectedtopicName = this.topic.TopicName;
         
        });
      
      } else {
        this.isVideo = true;
        
        this.getTopicList(this.courseId);
        this.topicService.getTopicListById(this.topicId).subscribe((res) => {
          this.isLoading = false;
          this.topic = res as Topic[]
          this.topicDesc = this.topic.TopicDesc;
          this.SelectedtopicName = this.topic.TopicName;
         
        });
      }
    }
  }

  getTopicList(courseId) {
    this.chapterService.getTopicListByChapter(courseId).subscribe((res) => {
      this.isLoading = false;
      this.chapterList = res as Chapter[]
    });
  }

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


  playVideoById(obj) {
    this.topicList = obj as Topic[];
    this.SelectedtopicName = this.topicList.TopicName;
    //console.log(this.SelectedtopicName);
    this.isLoading = true;

    if (this.topicList.VideoURL == null || this.topicList.VideoURL == "") {
      localStorage.removeItem("isReload");
      this.router.navigate(['/singletopic'], { queryParams: { VideoURL: obj.VideoURL, courseId: obj.CourseID, TopicID: obj._id } });
      window.location.reload();
      // return;
      this.isVideo = false;

      this.getTopicList(this.courseId);
      this.topicService.getTopicListById(this.topicList._id).subscribe((res) => {

        this.topic = res as Topic[]
        this.topicDesc = this.topic.TopicDesc;
        this.SelectedtopicName = this.topic.TopicName;

      });



    } else {
      localStorage.removeItem("isReload");
      this.router.navigate(['/singletopic'], { queryParams: { VideoURL: obj.VideoURL, courseId: obj.CourseID, TopicID: obj._id } });
      window.location.reload();
      this.SelectedtopicName = this.topicList.TopicName;
      this.isVideo = true;
      this.VideoUrl = obj.VideoURL;
      this.getTopicList(this.courseId);
      this.topicService.getTopicListById(this.topicList._id).subscribe((res) => {

        this.topic = res as Topic[]
        this.topicDesc = this.topic.TopicDesc;
        this.SelectedtopicName = this.topic.TopicName;

      });

    }
  }

  ngAfterViewInit() {
    $(function () {
      $('#slide-submenu').on('click', function () {
        $(this).closest('.list-group').fadeOut('slide', function () {
          $('.mini-submenu').fadeIn();
        });
        $('#right_div').addClass('col-md-11')
        $('#right_div').removeClass('col-md-8')
        $('#left_div').addClass('col-md-1')
        $('#left_div').removeClass('col-md-4')
      });

      $('.mini-submenu').on('click', function () {
        $(this).next('.list-group').toggle('slide');
        $('.mini-submenu').hide();

        $('#right_div').addClass('col-md-8')
        $('#right_div').removeClass('col-md-11')
        $('#left_div').addClass('col-md-4')
        $('#left_div').removeClass('col-md-1')

      })
    })
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
