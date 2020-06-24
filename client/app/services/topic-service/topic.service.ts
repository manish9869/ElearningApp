import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { Topic } from './topic.model';

@Injectable({
  providedIn: 'root'
})
export class TopicService {

  selectedTopic: Topic;
  topicList : Topic[];

  private url = 'http://localhost:3000/Topic';
  constructor(private http : HttpClient) { }

  postTopic(topic: Topic){
    return this.http.post(this.url,topic);
  }

  getTopicList(){
   return this.http.get(this.url);
   }

   getTopicListById(topicId){

    return this.http.get(this.url + `/${topicId}`);
    }
   putTopic(topic: Topic) {
    return this.http.put(this.url + `/${topic._id}`, topic);
  }

  deleteTopic(_id: string) {
    return this.http.delete(this.url + `/${_id}`);
  }

  
 getTopicListByChapterId(_id: String){
     
      return this.http.get(this.url +'/byChapterID'+ `/${_id}`);
      }
}
