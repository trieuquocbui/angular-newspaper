import { RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";
import { UserComponent } from "./user.component";
import { HomeComponent } from "./home/home.component";
import { HotNewsComponent } from "./hot-news/hot-news.component";

const routes: Routes = [
  {path:'',component:UserComponent,children:[
    {path: '', redirectTo: '/home', pathMatch: 'full'},
    {path:'home',component:HomeComponent},
    {path:'hot-news',component:HotNewsComponent},
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }