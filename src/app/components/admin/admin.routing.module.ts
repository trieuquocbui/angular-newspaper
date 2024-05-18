import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AdminComponent } from './admin.component';
import { NewspaperComponent } from './newspaper/newspaper.component';
import { NgModule } from '@angular/core';
import { AccountComponent } from './account/account.component';
import { TopicComponent } from './topic/topic.component';
import { OriginComponent } from './origin/origin.component';
import { AddTopicComponent } from './add-topic/add-topic.component';
import { EditTopicComponent } from './edit-topic/edit-topic.component';
import { AddOriginComponent } from './add-origin/add-origin.component';
import { EditOriginComponent } from './edit-origin/edit-origin.component';
import { AddNewspaperComponent } from './add-newspaper/add-newspaper.component';
import { InforNewspaperComponent } from './infor-newspaper/infor-newspaper.component';
import { EditNewspaperComponent } from './edit-newspaper/edit-newspaper.component';
import { ProfileComponent } from '../common/profile/profile.component';
import { DeactivedGuard } from 'src/app/guards/deactived.guard';
import { AdminGuard } from 'src/app/guards/admin.guard';

const routes: Routes = [
  { path:'', component:AdminComponent,children:[
    {path:'', redirectTo: '/management/home', pathMatch: 'full'},
    {path:'home',component:HomeComponent},
    {path:'account',component:AccountComponent},
    {path:'newspaper',component:NewspaperComponent},
    {path:'newspaper/add',component:AddNewspaperComponent,canDeactivate:[DeactivedGuard]},
    {path:'newspaper/information/:newspaperId',component:InforNewspaperComponent},
    {path:'newspaper/edit/:newspaperId',component:EditNewspaperComponent},
    {path:'topic',component:TopicComponent},
    {path:'topic/add',component:AddTopicComponent,canDeactivate:[DeactivedGuard]},
    {path:'topic/edit/:topicId',component:EditTopicComponent},
    {path:'origin',component:OriginComponent},
    {path:'origin/add',component:AddOriginComponent,canDeactivate:[DeactivedGuard]},
    {path:'origin/edit/:originId',component:EditOriginComponent},
    {path:'profile/:username',component:ProfileComponent},
  ],canActivate:[AdminGuard]},
];

@NgModule({
  exports:[RouterModule],
  imports:[RouterModule.forChild(routes)]
})
export class AdminRoutingModule {};
