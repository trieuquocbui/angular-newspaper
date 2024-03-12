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



@NgModule({
  imports: [
    CommonModule,
    AdminRoutingModule
  ],
  declarations: [
    AdminComponent,
    HomeComponent,
    AccountComponent,
    NewspaperComponent,
    NavbarComponent,
    HeaderComponent,
    FooterComponent
  ]
})
export class AdminModule { }
