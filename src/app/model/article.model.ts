
export interface Article {
    id:number;
    title:string;
    text ?:string;
    time:number;
    descendants:number;
    url:string;
    by: string;
    score : number;
  }