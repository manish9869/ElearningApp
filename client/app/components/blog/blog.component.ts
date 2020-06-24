import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormControl, Validators, NgForm } from '@angular/forms';
import { BlogService } from '../../services/blog-services/blog.service';
import { ToastrService } from 'ngx-toastr';
import { Blog } from '../../services/blog-services/blog.model';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {
  filesToUpload: Array<File> = [];

  @ViewChild('fileInput') fileInput: ElementRef;
  
  form = new FormGroup({
    _id: new FormControl(),
    BlogCategory: new FormControl(),
    BlogLevel: new FormControl(),
    BlogTitle: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(140)
    ]),
    BlogAbstract: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(250)
    ]),
    BlogContent: new FormControl('', [
      Validators.required,
      Validators.minLength(3)
    ]),
    BlogVideoURL: new FormControl('', [
      Validators.minLength(3)
    ]),
    BlogImageUrls: new FormControl('', [
      Validators.minLength(3)
    ]),
    BlogAuthor: new FormControl('', [
      Validators.minLength(3)
    ]),
    BlogPostedOn: new FormControl('', [
      Validators.minLength(3)
    ]),
  });

  get BlogCategory() { return this.form.get('BlogCategory'); }

  get BlogLevel() { return this.form.get('BlogLevel'); }

  get BlogTitle() { return this.form.get('BlogTitle'); }

  get BlogImageUrls() { return this.form.get('BlogImageUrls'); }

  get BlogAuthor() { return this.form.get('BlogAuthor'); }

  get BlogPostedOn() { return this.form.get('BlogPostedOn'); }

  constructor(public blogService: BlogService, private toastr: ToastrService) { }

  
  ngOnInit() {
    this.refreshBlogList();
    this.resetForm();
    // window.location.reload()
    // SyntaxHighlighter.all();
    // console.log('SyntaxHighlighter ',SyntaxHighlighter.call())
  }

  ddlCategory = [
    { CategoryName: 'C#' },
    { CategoryName: 'Asp.Net' },
    { CategoryName: 'Phython' },
    { CategoryName: 'R' },
    { CategoryName: 'Machine Learning' },
  ];

  ddlLevels = [
    { Level: 'Beginner' },
    { Level: 'Intermediat' },
    { Level: 'Expert' }
  ];

  selectedCategory;
  selectedLevels;
  ddlSelectedCategory(obj) {
    this.selectedCategory = obj;
  }

  ddlSelectedLevel(obj) {
    this.selectedLevels = obj;
  }

  resetForm(form?: NgForm) {
    if (form != null)
      form.reset();
    this.blogService.selectedBlog = {
      _id: "",
      BlogCategory: "",
      BlogLevel: "",
      BlogTitle: "",
      BlogAbstract: "",
      BlogContent: "",
      BlogVideoURL: "",
      BlogImageUrls: [],
      BlogAuthor: "",
      BlogPostedOn: null
    }
    this.filesToUpload = []
    this.selectedCategory = "";
    this.selectedLevels = "";
    this.refreshBlogList();
  }


  saveData(form?: NgForm) {
    const vm = this;
    if (form.value._id === '' || form.value._id === null) {

      // form.value['BlogImageUrls'] = uploadUrls ? uploadUrls : []
      form.value['BlogImageUrls'] = []
      form.value.BlogCategory = vm.selectedCategory['CategoryName'];
      form.value.BlogLevel = vm.selectedLevels['Level'];

      vm.blogService.postBlog(form.value)
        .subscribe(res => {
          vm.resetForm(form);
          //this.courseService.getCourseList();
          this.upload( res['_id'], function (err) {

            vm.refreshBlogList();
            vm.toastr.success('New Record Inserted');
          })
        });
    }
    else {
      // if (uploadUrls) {
      //   uploadUrls = vm.blogService.selectedBlog.BlogImageUrls.concat(uploadUrls);
      //   form.value['BlogImageUrls'] = uploadUrls ? uploadUrls : []
      // } else {
      //   form.value['BlogImageUrls'] = vm.blogService.selectedBlog.BlogImageUrls ? vm.blogService.selectedBlog.BlogImageUrls : []
      // }
      // console.log('form.value ', form.value)
      // return;
      form.value['BlogImageUrls'] = vm.blogService.selectedBlog.BlogImageUrls ? vm.blogService.selectedBlog.BlogImageUrls : []
      form.value.BlogCategory = vm.selectedCategory['CategoryName'];
      form.value.BlogLevel = vm.selectedLevels['Level'];

      vm.blogService.putBlog(form.value)
        .subscribe((res) => {
          this.upload( res['_id'], function (err) {
            vm.resetForm(form);
            vm.refreshBlogList();
            vm.toastr.success('Updated successfully');
          })

        });
    }

  }

  refreshBlogList() {
    this.blogService.getBlogList().subscribe((res) => {
      this.blogService.blogList = res as Blog[];
    });
  }
  ddlCategorySelectedValue;
  ddlCategoryValue(value: string) {
    // console.log(value);
    return this.ddlCategorySelectedValue = value;

  }
  onEdit(blog: Blog) {
    this.resetForm()
    this.blogService.selectedBlog = blog;

    this.selectedCategory = blog;

    this.selectedCategory.CategoryName=blog.BlogCategory;
    this.selectedLevels = blog;
    this.selectedLevels.Level = blog.BlogLevel;

  }

  onDelete(_id: string, form: NgForm) {
    if (confirm('Are you sure to delete this record ?') == true) {
      this.blogService.deleteBlog(_id).subscribe((res) => {
        this.refreshBlogList();
        this.resetForm(form);
        this.toastr.info('Record Deleted Succesfully');
      });
    }
  }
  upload( blogId: string,   callback: (err: any) => any): void {
    if (this.filesToUpload.length == 0) {
      return callback(null)
    }
    const formData: any = new FormData();
    const files: Array<File> = this.filesToUpload;
    // console.log(files);

    for (let i = 0; i < files.length; i++) {
      formData.append("uploads[]", files[i], files[i]['name']);
    }
    console.log('form data variable :   ' + formData.toString());
    this.blogService.uploadBlogImages(blogId ,formData)
      //this.http.post('http://localhost:3000/upload', formData)
      .subscribe(
        res => {
          console.log('files', res);
          callback(null)
        }
      )
  }

  fileChangeEvent(fileInput: any) {
    this.filesToUpload.push((<Array<File>>fileInput.target.files)[0]);
    // console.log('this.filesToUpload ', this.filesToUpload)
    //this.product.photo = fileInput.target.files[0]['name'];
  }
  removeFile(index: number) {
    this.filesToUpload.splice(index, 1)
    // console.log('this.filesToUpload ', this.filesToUpload)
  }
  removeOldFile(index: number) {
    this.blogService.selectedBlog.BlogImageUrls.splice(index, 1)
    // console.log('this.blogService.selectedBlog ', this.blogService.selectedBlog)
  }
}
