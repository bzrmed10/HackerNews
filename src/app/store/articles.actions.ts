import { Article } from '../model/article.model';
import { Action } from "@ngrx/store";

export enum ArticleActionsTypes {
    GET_ARTICLES = "[Article] Get Article",
    GET_ARTICLES_ID = "[Article] Get ID Article ",
    GET_ARTICLES_SUCCESS = "[Article] Get Article success",
    GET_MORE_INITIAL_ARTICLES = "[Article] Get more initial Article",
    LOAD_MORE_ARTICLES = "[Article] Load more Articles",
    GET_ARTICLES_ERROR  = "[Article] Get Article error",
    
    SEARCH_KEYWORD = "[Article] search articles by Keyword",
    SEARCH_KEYWORD_SUCCESS = "[Article] search articles by Keyword success",


}


export class GetArticleAction implements Action {

    type : ArticleActionsTypes = ArticleActionsTypes.GET_ARTICLES;
    constructor( public payload:any){}
}

export class SearchKeywordAction implements Action {

    type : ArticleActionsTypes = ArticleActionsTypes.SEARCH_KEYWORD;
    constructor( public payload:{key :string , page : number}){}
}
export class SearchKeywordActionSuccess implements Action {

    type : ArticleActionsTypes = ArticleActionsTypes.SEARCH_KEYWORD_SUCCESS;
    constructor( public payload:Article[]){}
}



export class GetArticleIdAction implements Action {

    type : ArticleActionsTypes = ArticleActionsTypes.GET_ARTICLES_ID;
    constructor( public payload: number[] ){}
}

export class GetArticleActionSuccess implements Action {

    type : ArticleActionsTypes = ArticleActionsTypes.GET_ARTICLES_SUCCESS;
    constructor( public payload: Article ){}
}
export class GetMoreInitialArticleAction implements Action {

    type : ArticleActionsTypes = ArticleActionsTypes.GET_MORE_INITIAL_ARTICLES;
    constructor( public payload: {articleId: number[],article : Article,index : number} ){}
}

export class LoadMoreArticlesAction implements Action {

    type : ArticleActionsTypes = ArticleActionsTypes.LOAD_MORE_ARTICLES;
    constructor( public payload: {articleId: number[],article : Article,indexStart:number,indexEnd : number} ){}
}

export class GetArticleActionError implements Action {

    type : ArticleActionsTypes = ArticleActionsTypes.GET_ARTICLES_ERROR;
    constructor( public payload:string){}
}

export type ArticleActions = 
GetArticleAction | GetArticleActionSuccess 
| GetArticleActionError | GetArticleIdAction
|GetMoreInitialArticleAction | SearchKeywordAction 
| SearchKeywordActionSuccess;