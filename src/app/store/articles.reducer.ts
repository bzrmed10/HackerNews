
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
        case ArticleActionsTypes.GET_MORE_ARTICLES_SUCCESS : 
        
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
                dataState:ArticleStateEnum.LOADED,
                articles:newArr,
                index:(<ArticleActions>action).payload.index
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