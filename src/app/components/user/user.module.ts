import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserComponent } from './user.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { UserRoutingModule } from './user-routing.module';
import { ToolBarComponent } from './tool-bar/tool-bar.component';
import { TopicSetComponent } from './topic-set/topic-set.component';
import { SliderDirective } from 'src/app/directives/SliderDirective.directive';
import { SliderComponent } from './slider/slider.component';
import { NewspaperComponent } from './newspaper/newspaper.component';
import { HomeComponent } from './home/home.component';
import { RecentNewspapersComponent } from './recent-newspapers/recent-newspapers.component';
import { NewNewspapersComponent } from './new-newspapers/new-newspapers.component';
import { DateFormatPipe } from "../../pipes/DateFormatPipe ";
import { NewspaperListComponent } from './newspaper-list/newspaper-list.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ShareModule } from '../share-module/share-module.module';
import { UserBoxComponent } from '../common/user-box/user-box.component';
import { DropdownDirective } from 'src/app/directives/dropdown.directive';
import { NotificationListComponent } from './notification-list/notification-list.component';
import { FavouriteListComponent } from './favourite-list/favourite-list.component';


@NgModule({
    declarations: [
        HomeComponent,
        NewNewspapersComponent,
        RecentNewspapersComponent,
        NewspaperComponent,
        UserComponent,
        HeaderComponent,
        ToolBarComponent,
        TopicSetComponent,
        SliderComponent,
        FooterComponent,
        SliderDirective,
        NewspaperListComponent,
        NotificationListComponent,
        FavouriteListComponent
    ],
    imports: [
        CommonModule,
        UserRoutingModule,
        DateFormatPipe,
        ReactiveFormsModule,
        ShareModule,
        UserBoxComponent,
        DropdownDirective
    ]
})
export class UserModule {}
