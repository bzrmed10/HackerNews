import { Component, OnInit } from '@angular/core';
import { Article } from 'src/app/model/article.model';

@Component({
  selector: 'app-articles-list',
  templateUrl: './articles-list.component.html',
  styleUrls: ['./articles-list.component.css']
})
export class ArticlesListComponent implements OnInit {

  articles: Article[] = [] ;



  constructor() { 
    var dateObj = new Date();
                        
    dateObj.setMinutes(dateObj.getMinutes() - 5); 
      
     
     for(let i =1 ; i<=11 ; i++){
      this.articles.push({
        id : i,
        title : "title "+i+" :Lorem Ipsum is simply dummy text.",
        description:"Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, …when an unknown printer took a galley of type and scrambled",
        createdAt : dateObj,
        numberComments: 50 });
     }
  }
  
  ngOnInit(): void {
    
  }

}
