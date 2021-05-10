import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Article } from '../model/article.model';

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

    getNumStory(date:string){
      return this.http.get(`https://hn.algolia.com/api/v1/search_by_date?tags=story&numericFilters=created_at_i>${date}`);
    }

    getNumComment(date:string){
      return this.http.get(`https://hn.algolia.com/api/v1/search_by_date?tags=comment&numericFilters=created_at_i>${date}`);
    }
    getNumAsk(date:string){
      return this.http.get(`https://hn.algolia.com/api/v1/search_by_date?tags=ask_hn&numericFilters=created_at_i>${date}`);
    }

    toTimestamp(strDate){
      let datum = Date.parse(strDate);
      return datum/1000;
     }

  



}
