import { forkJoin, Observable , of } from 'rxjs';
import { Injectable } from "@angular/core";
import { Actions, createEffect ,ofType } from "@ngrx/effects";
import {
    ArticleActions,
    ArticleActionsTypes,
    GetArticleAction,
    GetArticleActionError,
    GetArticleActionSuccess,
    GetArticleIdAction,
    GetMoreInitialArticleAction,
    LoadMoreArticlesAction,
    SearchKeywordActionSuccess
} from './articles.actions';
import { catchError, map ,mergeMap} from 'rxjs/operators';
import { ArticleService } from '../services/article.service';
import { Article } from '../model/article.model';

@Injectable()
export class ArticleEffects {
        constructor( private effectActions :Actions ,private articleService : ArticleService){}


        getArticleIDEffect:Observable<ArticleActions> = createEffect(
            
            ()=>this.effectActions.pipe(
                ofType(ArticleActionsTypes.GET_ARTICLES),
                mergeMap((action : ArticleActions)=>{
                    return this.articleService.getAllArticlesByType(action.payload)
                    .pipe(
                        
                        map((articlesID : number[]) => {
                             
                         return new GetArticleIdAction(articlesID);

                        }),
                        catchError((err)=>of(new GetArticleActionError(err.message)))
                    )
                })
   
            )
        );


        getArticlesEffect:Observable<ArticleActions> = createEffect(
            ()=>this.effectActions.pipe(
                ofType(ArticleActionsTypes.GET_ARTICLES_ID),
                mergeMap((action : ArticleActions)=>{

                        return this.articleService.getArticle(action.payload[0])
                        .pipe(
                            map((article : Article) => {    
                             return new GetMoreInitialArticleAction({articleId:action.payload,article:article,index:0});
                            }),
                            catchError((err)=>of(new GetArticleActionError(err.message)))
                        )
                        
                })
   
            )
        );

        getMoreArticlesEffect:Observable<ArticleActions> = createEffect(
            ()=>this.effectActions.pipe(
                ofType(ArticleActionsTypes.GET_MORE_INITIAL_ARTICLES),
                mergeMap((action : ArticleActions)=>{
                     if(action.payload.index>3){
                         
                        return this.articleService.getArticle(action.payload.articleId[action.payload.index])
                        .pipe(
                            map((article : Article) => {    
                             return new GetArticleActionSuccess(article);
                            }),
                            catchError((err)=>of(new GetArticleActionError(err.message)))
                        )
                     }else{
                        return this.articleService.getArticle(action.payload.articleId[action.payload.index+1])
                        .pipe(
                            map((article : Article) => {    
                             return new GetMoreInitialArticleAction({articleId:action.payload.articleId,article:article,index:action.payload.index+1});             
                            }),
                            catchError((err)=>of(new GetArticleActionError(err.message)))
                        )
                     }
                })
            )
        );



        LoadMoreArticlesEffect:Observable<ArticleActions> = createEffect(
            ()=>this.effectActions.pipe(
                ofType(ArticleActionsTypes.LOAD_MORE_ARTICLES),
                mergeMap((action : ArticleActions)=>{
                     if(action.payload.indexStart>action.payload.indexEnd){
                        return this.articleService.getArticle(action.payload.articleId[action.payload.indexStart])
                        .pipe(
                            map((article : Article) => {    
                             return new GetArticleActionSuccess(article);
                            }),
                            catchError((err)=>of(new GetArticleActionError(err.message)))
                        )
                     }else{
                        return this.articleService.getArticle(action.payload.articleId[action.payload.indexStart+1])
                        .pipe(
                            map((article : Article) => {    
                             return new LoadMoreArticlesAction({articleId:action.payload.articleId,article:article,indexStart:action.payload.indexStart+1,indexEnd:action.payload.indexEnd});             
                            }),
                            catchError((err)=>of(new GetArticleActionError(err.message)))
                        )
                     }
                })
            )
        );



        SearchArticlesEffect:Observable<ArticleActions> = createEffect(
            ()=>this.effectActions.pipe(
                ofType(ArticleActionsTypes.SEARCH_KEYWORD),
                mergeMap((action : ArticleActions)=>{
                    
                    let searchedArticle = [];
                    return  this.articleService.getSearchedItem(action.payload.key,action.payload.page)
                        .pipe(
                            map((data : any)=>{  
                            if(data.nbHits != 0){
                              if(data.nbPages>data.page){
                              data.hits.forEach(element => {
                                searchedArticle.push({
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
                             
                            }
                            return new SearchKeywordActionSuccess(searchedArticle);
                          }else{
                            return new GetArticleActionError("NOT FOUND");
                          }
                          
                        }),
                        catchError((err)=>of(new GetArticleActionError(err.message))))
    
                })
   
            )
        );
        
}