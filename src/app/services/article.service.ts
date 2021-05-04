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
  searchSubject  = new Subject<Article []>();
  newSearchKey = new Subject<boolean>() ;
  constructor(private http : HttpClient) { }

  // return an array of ID items depending the type : new stories / top stories / jobs / show
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

  // return all the stories that containe the keyword 
  getSearchedItem(keyword : string,page:number = null){
    this.newSearchKey.next(false);
    this.searchedArticle = [];
    let pageFilter :string = "";
    page ? pageFilter = `&page=${page}` : '';
    const URL = `${environment.API_BASE_URL_SEARCH}${keyword}&tags=story`+pageFilter;
    return this.http.get(URL)
    .subscribe((data : any)=>{  
        if(data.nbHits != 0){
          if(data.nbPages>data.page){
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
          }
          );
          this.searchSubject.next(this.searchedArticle);
        }
      }else{
        this.searchSubject.next(this.searchedArticle);
        }
        
      
      
    },error=>{
      console.log(error);
    });
  
  }
  //  getting the Data of the Item by giving the ID
  getArticle(id : number){
    return this.http.get(`${environment.API_BASE_URL}item/${id}.json`);
  }



}
