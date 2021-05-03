import { ArticleService } from '../../services/article.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu-list',
  templateUrl: './menu-list.component.html',
  styleUrls: ['./menu-list.component.css']
})
export class MenuListComponent implements OnInit {
  
  showSearch : boolean = false;
  constructor(private articleService :ArticleService,private router :Router) { }

  ngOnInit(): void {
  }
  onSearchBtn(){
    this.showSearch = !this.showSearch;
  }

  onSearch(value:any){
    this.articleService.newSearchKey.next(true);
     if(value.keyword != ""){
      this.articleService.getSearchedItem(value.keyword);
      this.router.navigateByUrl("/articles/search?keyword="+value.keyword);
     }
      

  }
}
