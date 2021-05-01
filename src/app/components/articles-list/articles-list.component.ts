import { Component, OnInit } from '@angular/core';
import { Article } from 'src/app/model/article.model';
import { ArticleService } from '../../services/article.service';
import { forkJoin, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-articles-list',
  templateUrl: './articles-list.component.html',
  styleUrls: ['./articles-list.component.css']
})
export class ArticlesListComponent implements OnInit {

  articles: Article[] = [] ;
  index : number =0;
  loading : boolean;
 
  articleTypesArray = ["topstories","newstories","beststories","showstories","jobstories"]

  constructor(private articleService :ArticleService,
              private activatedRoute : ActivatedRoute,
              private router : Router) { 
   
       
  }
  
  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      this.loading = true;
      const articleType : string = params.get('articleType');
      if(this.articleTypesArray.includes(articleType)){
        this.articleService.getAllArticlesByType(articleType).then(()=>{
          this.articles = [];
          this.index = 0;
          this.loadArticles();

        })
      }
    });
    
    
  }

  loadArticles(){
    const articlesDataArr = [];
    for (let i = this.index; i < this.index + 5; i++) {
      articlesDataArr.push(
        this.articleService.getArticle(this.articleService.articlesService[i])
      );
    }
    this.loading = true;
    forkJoin(articlesDataArr).subscribe(
    (moreStories: Array<Article>) => {
      this.articles = [...this.articles, ...moreStories];
      this.loading = false;
      this.index = this.index + 5;
    },
    () => {
      this.loading = false;
    }
    );
  
  }

}
