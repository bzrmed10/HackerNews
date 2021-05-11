import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { GetArticleAction, GetPastArticleAction, SearchKeywordAction } from 'src/app/store/articles.actions';
import { ArticlesState, ArticleStateEnum } from '../../store/articles.reducer';
import { LoadMoreArticlesAction } from '../../store/articles.actions';
import { ArticleService } from '../../services/article.service';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-articles-list',
  templateUrl: './articles-list.component.html',
  styleUrls: ['./articles-list.component.css']
})
export class ArticlesListComponent implements OnInit {

  modelDate: NgbDateStruct;
  showDateInput = false;
  articleTypesArray = ["topstories","newstories","beststories","showstories","jobstories","askstories"]
  keySearch : string;
  yesterdayTimestamp : number;
  todayTimestamp : number;
  articleState$ :Observable <ArticlesState> | null = null;
  appState :ArticlesState;
  readonly ArticleStateEnum = ArticleStateEnum;

  constructor(private activatedRoute : ActivatedRoute,
              private store : Store<any> ,private articleService :ArticleService) { 
              
       
  }
  
  ngOnInit(): void {

   
    this.activatedRoute.paramMap.subscribe(params => {
      const articleType : string = params.get('articleType');
      if(this.articleTypesArray.includes(articleType)){
        this.showDateInput = false;
          this.store.dispatch(new GetArticleAction(articleType));
      }
      if(articleType == "paststories"){
        this.modelDate =null;
        this.showDateInput = true;
        const today = new Date()
        const yesterday = new Date(today);

          yesterday.setDate(yesterday.getDate() - 1);
          this.yesterdayTimestamp = this.articleService.toTimestamp(yesterday.toDateString());
          this.todayTimestamp = this.articleService.toTimestamp(today.toDateString());
          this.store.dispatch(new GetPastArticleAction({dateStart :this.yesterdayTimestamp,dateEnd : this.todayTimestamp , page : 0}));
      }
 
    });
    this.activatedRoute.queryParamMap.subscribe(p =>{
      if(p['params'].keyword){
        this.showDateInput = false;
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

  loadMorePastArticles(){
    let page = this.appState.seachPage +1;
    this.store.dispatch(new GetPastArticleAction({dateStart :this.yesterdayTimestamp,dateEnd : this.todayTimestamp , page : page}));
  }

  getPastArticle(date: NgbDateStruct){
    this.yesterdayTimestamp = this.articleService
    .toTimestamp(`${date.year} ${date.month} ${date.day} 00:00:00`);
    this.todayTimestamp = this.articleService
    .toTimestamp(`${date.year} ${date.month} ${date.day} 23:59:59`);
    this.store.dispatch(new GetPastArticleAction({dateStart :this.yesterdayTimestamp,dateEnd : this.todayTimestamp , page : 0}));
  }

}
