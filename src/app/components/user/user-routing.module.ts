import { RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";
import { UserComponent } from "./user.component";
import { HotNewsComponent } from "./hot-news/hot-news.component";
import { NewsComponent } from "./news/news.component";
import { NewspaperComponent } from "./newspaper/newspaper.component";

const routes: Routes = [
  {path:'',component:UserComponent,children:[
    {path: '', redirectTo: '/home', pathMatch: 'full'},
    {path:'home',component:NewsComponent},
    {path:'hot-news',component:HotNewsComponent},
    {path:'newspaper/:newpaperId',component:NewspaperComponent}
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }