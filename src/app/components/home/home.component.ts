import { ArticleService } from '../../services/article.service';
import { Subscription } from 'rxjs';
import { Component, OnDestroy, OnInit } from '@angular/core';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit ,OnDestroy{
  today = new Date();
  myToday = new Date(this.today.getFullYear(), this.today.getMonth(), this.today.getDate(), 0, 0, 0);
  nbStory:number;
  nbComment : number;
  nbAsk : number;
  nbShow:number;
  storySubscribtion : Subscription;
  askSubscribtion : Subscription;
  commentSubscribtion : Subscription;
  showSubscribtion : Subscription;
  constructor( private articleService : ArticleService ) { }

  ngOnInit(): void {

  
    this.storySubscribtion = this.articleService.getNumStory(this.articleService.toTimestamp(this.myToday))
    .subscribe((a :  any) => this.nbStory = a.nbHits);

    this.askSubscribtion = this.articleService.getNumAsk(this.articleService.toTimestamp(this.myToday))
    .subscribe((a :  any)=> this.nbAsk = a.nbHits);

     this.commentSubscribtion = this.articleService.getNumComment(this.articleService.toTimestamp(this.myToday))
    .subscribe((a :  any)=>  this.nbComment =a.nbHits);
    
    this.showSubscribtion = this.articleService.getNumShow(this.articleService.toTimestamp(this.myToday))
    .subscribe((a :  any)=>  this.nbShow =a.nbHits);
  }

  ngOnDestroy (){
    
    this.commentSubscribtion.unsubscribe();
    this.askSubscribtion.unsubscribe();
    this.storySubscribtion.unsubscribe();
    this.showSubscribtion.unsubscribe();
  }

}
