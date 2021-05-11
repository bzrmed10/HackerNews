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

    getPastArticles(dateStart : number,dateEnd : number , page:number = null){
      let pageFilter :string = "";
      page ? pageFilter = `&page=${page}` : '';
      const URL = `${environment.API_BASE_URL_TAG}story&numericFilters=created_at_i>${dateStart},created_at_i<${dateEnd}`+pageFilter;
      return this.http.get<any>(URL);
    }

    getNumStory(date){
      return this.http.get(`${environment.API_BASE_URL_TAG}story&numericFilters=created_at_i>${date}`);
    }

    getNumComment(date){
      return this.http.get(`${environment.API_BASE_URL_TAG}comment&numericFilters=created_at_i>${date}`);
    }
    getNumAsk(date){
      return this.http.get(`${environment.API_BASE_URL_TAG}ask_hn&numericFilters=created_at_i>${date}`);
    }
    getNumShow(date){
      return this.http.get(`${environment.API_BASE_URL_TAG}show_hn&numericFilters=created_at_i>${date}`);
    }

    toTimestamp(strDate){
      let datum = Date.parse(strDate);
      return datum/1000;
     }

  



}
