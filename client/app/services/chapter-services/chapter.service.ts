import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { Chapter } from './chapter.model';

@Injectable({
  providedIn: 'root'
})
export class ChapterService {

  selectedChapter: Chapter;
  chapterList : Chapter[];

  private url = 'http://localhost:3000/Chapter';
  constructor(private http : HttpClient) { }


  postChapter(chapter: Chapter){
    return this.http.post(this.url,chapter);
  }

  getChapterList(){
   return this.http.get(this.url);
   }

 getChapterListById(_id: String){
    return this.http.get(this.url +'/bycourse'+ `/${_id}`);
    }


   putChapter(chapter: Chapter) {
    return this.http.put(this.url + `/${chapter._id}`, chapter);
  }

  deleteChapter(_id: string) {
    return this.http.delete(this.url + `/${_id}`);
  }

  getTopicListByChapter(_id: string){
return this.http.get(this.url +'/byChapter'+ `/${_id}`);
  }

}
