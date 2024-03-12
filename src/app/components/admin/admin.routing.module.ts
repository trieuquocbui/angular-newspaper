import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AdminComponent } from './admin.component';
import { NewspaperComponent } from './newspaper/newspaper.component';
import { NgModule } from '@angular/core';
import { AccountComponent } from './account/account.component';



const routes: Routes = [
  { path:'', component:AdminComponent,children:[
    {path:'', redirectTo: '/admin/home', pathMatch: 'full'},
    {path:'newspaper',component:NewspaperComponent},
    {path:'home',component:HomeComponent},
    {path:'account',component:AccountComponent}
  ]},
];
@NgModule({
  exports:[RouterModule],
  imports:[RouterModule.forChild(routes)]
})
export class  AdminRoutingModule {};
