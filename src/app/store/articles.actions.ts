import { Article } from '../model/article.model';
import { Action } from "@ngrx/store";

export enum ArticleActionsTypes {
    GET_ARTICLES = "[Article] Get Article",
    GET_ARTICLES_ID = "[Article] Get ID Article ",
    GET_ARTICLES_SUCCESS = "[Article] Get Article success",
    GET_MORE_ARTICLES_SUCCESS = "[Article] Get more Article success",
    GET_ARTICLES_ERROR  = "[Article] Get Article error",

}


export class GetArticleAction implements Action {

    type : ArticleActionsTypes = ArticleActionsTypes.GET_ARTICLES;
    constructor( public payload:any){}
}
export class GetArticleIdAction implements Action {

    type : ArticleActionsTypes = ArticleActionsTypes.GET_ARTICLES_ID;
    constructor( public payload: number[] ){}
}

export class GetArticleActionSuccess implements Action {

    type : ArticleActionsTypes = ArticleActionsTypes.GET_ARTICLES_SUCCESS;
    constructor( public payload: Article ){}
}
export class GetMoreArticleActionSuccess implements Action {

    type : ArticleActionsTypes = ArticleActionsTypes.GET_MORE_ARTICLES_SUCCESS;
    constructor( public payload: {articleId: number[],article : Article,index : number} ){}
}

export class GetArticleActionError implements Action {

    type : ArticleActionsTypes = ArticleActionsTypes.GET_ARTICLES_ERROR;
    constructor( public payload:string){}
}

export type ArticleActions = 
GetArticleAction | GetArticleActionSuccess 
| GetArticleActionError | GetArticleIdAction
|GetMoreArticleActionSuccess;