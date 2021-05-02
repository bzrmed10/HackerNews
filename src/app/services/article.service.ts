import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Article } from '../model/article.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  articlesService : number[];
  articleService : Article;
  errorService : string;
  searchedArticle : Article []= [];
  searchSubject : Subject<Article []> = new Subject();
  constructor(private http : HttpClient) { }

  getAllArticlesByType(type :string){
    return new Promise((resolve, reject) => {
      this.http.get(`${environment.API_BASE_URL}${type}.json`)
      .subscribe((articles: number[]) => {
        this.articlesService = articles;
        resolve(articles);
      }, 
      (error) => { 
        reject(error); 
      });
    });
  }

  getSearchedItem(keyword : string){
    this.searchedArticle = [];
    return this.http.get(`${environment.API_BASE_URL_SEARCH}${keyword}&tags=story`)
    .subscribe((data : any)=>{
      data.hits.forEach(element => {
        this.searchedArticle.push({
          id:element.objectID,
          title:element.title,
          text:element.story_text,
          time:element.created_at_i,
          descendants:element.num_comments,
          url:element.url,
          by: element.author,
          score :element.points
        }
         
        )
      });
      
    });
  
  }
  



 

  toTimestamp(strDate){
    var datum = Date.parse(strDate);
    return datum/1000;
   }

  UnixTimeToDate(unix : number){
    
    const milliseconds = unix * 1000 // 1575909015000

    const dateObject = new Date(milliseconds)

    let arrDate = dateObject.toLocaleString().split(',')
    return arrDate[0] ;
  }

  getArticle(id : number){
    return this.http.get(`${environment.API_BASE_URL}item/${id}.json`);
  }
}
