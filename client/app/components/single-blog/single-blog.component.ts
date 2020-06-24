import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Blog } from '../../services/blog-services/blog.model';
import { BlogService } from '../../services/blog-services/blog.service';

@Component({
  selector: 'app-single-blog',
  templateUrl: './single-blog.component.html',
  styleUrls: ['./single-blog.component.css']
})
export class SingleBlogComponent implements OnInit {

  constructor(private route: ActivatedRoute, public blogService: BlogService) { }
  blogId: string;
  ngOnInit() {
    if (!localStorage.isReload) {
      localStorage.isReload = 'true'
      window.location.reload()
    } else {
      this.route.queryParams
        .filter(params => params.BlogId)
        .subscribe(params => {
          this.blogId = params.BlogId;
          
        });
      this.getAllBlogCategory();
      this.loadSingleBlogList(this.blogId);
    }
  }
  singleBlog;
  loadSingleBlogList(blogId) {

    this.blogService.singleBlog(blogId).subscribe((res) => {
      this.singleBlog = res as Blog[]
      
    });

  }

  categoryList;
  getAllBlogCategory() {
    this.categoryList = this.blogService.getBlogCategory();
    
  }

}
