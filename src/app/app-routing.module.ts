import { AppComponent } from './app.component';
import { ArticlesListComponent } from './components/articles-list/articles-list.component';

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
{
    path : '' , redirectTo:'articles/newstories' ,pathMatch:'full'
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
