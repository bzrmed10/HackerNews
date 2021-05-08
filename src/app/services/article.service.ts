import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Article } from '../model/article.model';
import { Subject, Observable, forkJoin } from 'rxjs';
import { catchError, map ,mergeMap} from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class ArticleService {


  constructor(private http : HttpClient) { }

  // return an array of ID items depending the type : new stories / top stories / jobs / show
  getAllArticlesByType(type :string){
    return this.http.get<number[]>(`${environment.API_BASE_URL}${type}.json`);
  }


  //  getting the Data of the Item by giving the ID
  getArticle(id : number)  {
   return this.http.get<Article>(`${environment.API_BASE_URL}item/${id}.json`);
    
  }

    // return all the stories that containe the keyword 
    getSearchedItem(keyword : string,page:number = null){
      let pageFilter :string = "";
      page ? pageFilter = `&page=${page}` : '';
      const URL = `${environment.API_BASE_URL_SEARCH}${keyword}&tags=story`+pageFilter;
      return this.http.get<any>(URL);
    }

  

  



}
