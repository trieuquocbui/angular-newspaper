import { RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";
import { UserComponent } from "./user.component";
import { NewspaperComponent } from "./newspaper/newspaper.component";
import { HomeComponent } from "./home/home.component";
import { ProfileComponent } from "../common/profile/profile.component";
import { NotificationListComponent } from "./notification-list/notification-list.component";
import { FavouriteListComponent } from "./favourite-list/favourite-list.component";

const routes: Routes = [
  {path:'',component:UserComponent,children:[
    {path: '', redirectTo: '/home', pathMatch: 'full'},
    {path:'home',component:HomeComponent},
    {path:'newspaper/:newspaperId',component:NewspaperComponent},
    {path:'profile/:username',component:ProfileComponent},
    {path:'favourite/:username',component:FavouriteListComponent},
    {path:'notification',component:NotificationListComponent}
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }