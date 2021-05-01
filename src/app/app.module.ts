import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { MenuListComponent } from './components/menu-list/menu-list.component';
import { ArticlesListComponent } from './components/articles-list/articles-list.component';
import { FooterComponent } from './components/footer/footer.component';
import { ArticleComponent } from './components/articles-list/article/article.component';
import { DateAgoPipe } from './pipes/date-ago.pipe';
import { DescriptionPipe } from './pipes/description.pipe';
import { AppRoutingModule } from './app-routing.module';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    MenuListComponent,
    ArticlesListComponent,
    FooterComponent,
    ArticleComponent,
    DateAgoPipe,
    DescriptionPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
