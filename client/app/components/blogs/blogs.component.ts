import { Component, OnInit } from '@angular/core';
import { Blog } from '../../services/blog-services/blog.model';
import { BlogService } from '../../services/blog-services/blog.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-blogs',
  templateUrl: './blogs.component.html',
  styleUrls: ['./blogs.component.css']
})
export class BlogsComponent implements OnInit {

  constructor(public blogService: BlogService, private route: ActivatedRoute) { }
  blogList;
  ParaCategoryName;
  ngOnInit() {

    this.route.queryParams
    .filter(params => params.CategoryName)
    .subscribe(params => {
      this.ParaCategoryName = params.CategoryName;
      this.loadBlogsAsPerCat(this.ParaCategoryName);
    console.log(this.ParaCategoryName);
    });


if(this.ParaCategoryName == null ){
  this.getAllBlogList();
}
   
    this.getAllBlogCategory();
    localStorage.removeItem("isReload");
  }

  getAllBlogList() {

    this.blogService.getBlogList().subscribe((res) => {
      this.blogList = res as Blog[]
    });
  }

  categoryList;
  getAllBlogCategory() {
    this.categoryList = this.blogService.getBlogCategory();

  }

  selectCategory;

  loadBlogsAsPerCat(CategoryName) {

    if (CategoryName == 'All') {
      this.getAllBlogList();
    } else {
      console.log(CategoryName);
      this.blogService.getBlogsAsPerCategory(CategoryName).subscribe((res) => {
        this.blogList = res as Blog[]

        console.log(this.blogList);
      });
    }


  }



}

