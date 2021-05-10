import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { GetArticleAction, SearchKeywordAction } from 'src/app/store/articles.actions';
import { ArticlesState, ArticleStateEnum } from '../../store/articles.reducer';
import { LoadMoreArticlesAction } from '../../store/articles.actions';


@Component({
  selector: 'app-articles-list',
  templateUrl: './articles-list.component.html',
  styleUrls: ['./articles-list.component.css']
})
export class ArticlesListComponent implements OnInit {

  
  articleTypesArray = ["topstories","newstories","beststories","showstories","jobstories","askstories"]
  keySearch : string;
  
  articleState$ :Observable <ArticlesState> | null = null;
  appState :ArticlesState;
  readonly ArticleStateEnum = ArticleStateEnum;

  constructor(private activatedRoute : ActivatedRoute,
              private store : Store<any>) { 
              
       
  }
  
  ngOnInit(): void {

   
    this.activatedRoute.paramMap.subscribe(params => {
      const articleType : string = params.get('articleType');
      if(this.articleTypesArray.includes(articleType)){
          this.store.dispatch(new GetArticleAction(articleType));
      }
 
    });
    this.activatedRoute.queryParamMap.subscribe(p =>{
      if(p['params'].keyword){
        this.keySearch = p['params'].keyword;
        this.store.dispatch(new SearchKeywordAction({key :this.keySearch , page : 0}))
    
      }
       
     })



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
 

  loadSearchResult(){
    let page = this.appState.seachPage +1;
    this.store.dispatch(new SearchKeywordAction({key :this.keySearch , page : page}))

  }


}
