import { AppComponent } from './app.component';
import { ArticlesListComponent } from './components/articles-list/articles-list.component';

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
{
    path : '' , redirectTo:'/new' ,pathMatch:'full'
},
{
  path:"new" , component : ArticlesListComponent,
},
{ 
  path:"past" , component :ArticlesListComponent,
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
