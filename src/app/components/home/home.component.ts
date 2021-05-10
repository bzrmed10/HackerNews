import { ArticleService } from '../../services/article.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  today = new Date();
  myToday = new Date(this.today.getFullYear(), this.today.getMonth(), this.today.getDate(), 0, 0, 0);
  constructor( private articleService : ArticleService) { }

  ngOnInit(): void {
    console.log(this.myToday);
    console.log(this.articleService.toTimestamp(this.myToday))
  }

}
