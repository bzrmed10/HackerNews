import { forkJoin, Observable , of } from 'rxjs';
import { Injectable } from "@angular/core";
import { Actions, createEffect ,ofType } from "@ngrx/effects";
import { ArticleActions, ArticleActionsTypes, GetArticleAction, GetArticleActionError, GetArticleActionSuccess, GetArticleIdAction, GetMoreArticleActionSuccess } from './articles.actions';
import { catchError, flatMap, map ,mergeMap, switchMap, tap} from 'rxjs/operators';
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
                             return new GetMoreArticleActionSuccess({articleId:action.payload,article:article,index:0});
                            }),
                            catchError((err)=>of(new GetArticleActionError(err.message)))
                        )
                        
                })
   
            )
        );

        getMoreArticlesEffect:Observable<ArticleActions> = createEffect(
            ()=>this.effectActions.pipe(
                ofType(ArticleActionsTypes.GET_MORE_ARTICLES_SUCCESS),
                mergeMap((action : ArticleActions)=>{
                     if(action.payload.index>4){
                         
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
                             return new GetMoreArticleActionSuccess({articleId:action.payload.articleId,article:article,index:action.payload.index+1});
                             
                            }),
                            catchError((err)=>of(new GetArticleActionError(err.message)))
                        )
                     }
                        
                    
                        
                })
   
            )
        );
}