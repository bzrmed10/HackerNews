import { AppComponent } from './app.component';
import { ArticlesListComponent } from './components/articles-list/articles-list.component';

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';

const routes: Routes = [
{
    path : '' , redirectTo:'home' ,pathMatch:'full'
},
{
  path: 'home', component: HomeComponent
},
{
  path: 'articles/:articleType', component: ArticlesListComponent
},

{
  path:'**', redirectTo: 'articles/newstories'
}
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
