import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
import { HomeComponent } from './home/home.component';
import { NewspaperComponent } from './newspaper/newspaper.component';
import { AdminRoutingModule } from './admin.routing.module';
import { NavbarComponent } from './navbar/navbar.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { AccountComponent } from './account/account.component';
import { TopicComponent } from './topic/topic.component';
import { OriginComponent } from './origin/origin.component';
import { AddTopicComponent } from './add-topic/add-topic.component';
import { EditTopicComponent } from './edit-topic/edit-topic.component';
import { EditOriginComponent } from './edit-origin/edit-origin.component';
import { AddOriginComponent } from './add-origin/add-origin.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ShareModule } from '../share-module/share-module.module';
import { AddNewspaperComponent } from './add-newspaper/add-newspaper.component';
import { InforNewspaperComponent } from './infor-newspaper/infor-newspaper.component';
import { EditNewspaperComponent } from './edit-newspaper/edit-newspaper.component';
import { DateFormatPipe } from 'src/app/pipes/DateFormatPipe ';
import { UserBoxComponent } from '../common/user-box/user-box.component';

@NgModule({
  imports: [
    CommonModule,
    AdminRoutingModule,
    ReactiveFormsModule,
    ShareModule,
    DateFormatPipe,
    UserBoxComponent
  ],
  declarations: [
    AdminComponent,
    NavbarComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    AccountComponent,
    NewspaperComponent,
    InforNewspaperComponent,
    TopicComponent,
    OriginComponent,
    AddNewspaperComponent,
    AddTopicComponent,
    AddOriginComponent,
    EditTopicComponent,
    EditNewspaperComponent,
    EditOriginComponent,
  ],
})
export class AdminModule { }
