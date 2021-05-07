
import { Action } from "@ngrx/store";
import { Article } from "../model/article.model";
import { ArticleActions, ArticleActionsTypes } from "./articles.actions";

export enum ArticleStateEnum {
    LOADING = "Loading",
    LOADED = "Loaded",
    ERROR = "Error",
    INITIAL = "Initial"
}

export interface ArticlesState {
    articleIds: number[],
    articles : Article[],
    errorMessage : string,
    dataState : ArticleStateEnum,
    index : number

}

const INIT_STATE :ArticlesState = {
    articleIds:[],
    articles : [],
    errorMessage : "",
    dataState :ArticleStateEnum.INITIAL,
    index : 0


}

export function articleReducer(state = INIT_STATE ,action :Action ) :ArticlesState {
    switch(action.type){
        case ArticleActionsTypes.GET_ARTICLES : 
            return {
                ...state ,
                dataState:ArticleStateEnum.LOADING
            }
            case ArticleActionsTypes.GET_ARTICLES_ID : 
            return {
                ...state ,
                articleIds:(<ArticleActions>action).payload,
                articles:[]
            }
        case ArticleActionsTypes.GET_ARTICLES_SUCCESS :          
            return {
                ...state ,
                dataState:ArticleStateEnum.LOADED,
            }
        case ArticleActionsTypes.GET_MORE_INITIAL_ARTICLES : 
        let newArr : Article[] = []; 
        if(state.articles.length == 0){
            newArr.push((<ArticleActions>action).payload.article);
        }else{
            let newArticle : Article[] = [];
            newArticle.push((<ArticleActions>action).payload.article);
            newArr = [...state.articles,...newArticle];
        }
            return {
                ...state ,
                articles:newArr,
                index:(<ArticleActions>action).payload.index
            }
        case ArticleActionsTypes.LOAD_MORE_ARTICLES: 
        if((<ArticleActions>action).payload.article != null){
            let newArr2 : Article[] = []; 
            let newArticle2 : Article[] = [];
            newArticle2.push((<ArticleActions>action).payload.article);
            newArr2 = [...state.articles,...newArticle2];
        
            return {
                ...state ,
                articles:newArr2,
                index:(<ArticleActions>action).payload.indexStart
            }
        }else{
            return {
                ...state
            }
        }
       
        case ArticleActionsTypes.GET_ARTICLES_ERROR: 
            return {
                ...state ,
                dataState:ArticleStateEnum.ERROR,
                errorMessage:(<ArticleActions>action).payload
            }         
        default : return {...state} 
    }
}