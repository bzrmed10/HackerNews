import { Component, OnInit } from '@angular/core';
import { Article } from 'src/app/model/article.model';
import { ArticleService } from '../../services/article.service';
import { forkJoin, Observable, Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import {map, tap} from 'rxjs/operators';
import { error } from 'selenium-webdriver';
import { Store } from '@ngrx/store';
import { GetArticleAction } from 'src/app/store/articles.actions';
import { ArticlesState, ArticleStateEnum } from '../../store/articles.reducer';
import { LoadMoreArticlesAction } from '../../store/articles.actions';


@Component({
  selector: 'app-articles-list',
  templateUrl: './articles-list.component.html',
  styleUrls: ['./articles-list.component.css']
})
export class ArticlesListComponent implements OnInit {

  
  articleTypesArray = ["topstories","newstories","beststories","showstories","jobstories"]

  
  articleState$ :Observable <ArticlesState> | null = null;
  appState :ArticlesState;
  readonly ArticleStateEnum = ArticleStateEnum;

  constructor(private articleService :ArticleService,
              private activatedRoute : ActivatedRoute,
              private store : Store<any>) { 
              
       
  }
  
  ngOnInit(): void {

   
    this.activatedRoute.paramMap.subscribe(params => {
      const articleType : string = params.get('articleType');
      if(this.articleTypesArray.includes(articleType)){
          this.store.dispatch(new GetArticleAction(articleType));
      }
     
    });
    
    this.articleState$ = this.store.pipe(
      map(
        (state) =>{ this.appState = state.articleState;return state.articleState}
        ));
    
  }

  loadArticles(){
    let indexStart = this.appState.index +1;
    let indexEnd = indexStart + 9;
    this.store.dispatch(
      new LoadMoreArticlesAction(
        {articleId : this.appState.articleIds,
          article : null,
        indexStart: indexStart ,
        indexEnd:indexEnd }));
  }
 


}
