import { AppComponent } from './app.component';
import { ArticlesListComponent } from './components/articles-list/articles-list.component';

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
{
    path : '' , redirectTo:'articles/topstories' ,pathMatch:'full'
},
{
  path: 'articles/:articleType', component: ArticlesListComponent
},


{
  path:'**', redirectTo: 'articles/topstories'
}
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
