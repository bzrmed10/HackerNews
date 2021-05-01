import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Article } from '../model/article.model';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  articlesService : number[];
  articleService : Article;
  errorService : string;

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

  getArticle(id : number){
    return this.http.get(`${environment.API_BASE_URL}item/${id}.json`);
  }
}
