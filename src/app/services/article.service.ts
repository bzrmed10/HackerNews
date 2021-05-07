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

  getAll(articlesID) : Article[]{
    let arrayArticle : Article[] = [] ;
    const articlesDataArr = [];
                                for (let i = 0; i < 5; i++) {
                                    articlesDataArr.push(
                                   this.getArticle(articlesID[i])
                                    );   
                                            
                                    }
                                forkJoin(articlesDataArr).subscribe(
                                    (moreStories: Array<Article>) => {
                                      arrayArticle = [...moreStories]
                                      
                                    });
              return arrayArticle;
  }

  



}
