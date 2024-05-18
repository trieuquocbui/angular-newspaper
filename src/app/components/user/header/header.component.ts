import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DropdownDirective } from 'src/app/directives/dropdown.directive';
import { AppEnum } from 'src/app/helpers/app';
import { CodeEnum } from 'src/app/helpers/code';
import { PagenationEnum } from 'src/app/helpers/pagenation';
import { Notification } from 'src/app/models/notification';
import { Params } from 'src/app/models/params';
import { AuthService } from 'src/app/services/auth.service';
import { NotificationService } from 'src/app/services/notification.service';
import { WebsocketService } from 'src/app/services/websocket.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  isNotify:boolean = false;
  pathImageFile:String = AppEnum.PATH_IMAGE_FIME;
  page:number = PagenationEnum.DEFAULT_PAGE;
  offset:number = PagenationEnum.DEFAULT_LIMIT;
  sortDir:string = "desc";

  public isLogged:boolean = this.authService.isLoggedIn();

  public notificationList:Notification[] = [];

  constructor(private webSocketService:WebsocketService,private authService:AuthService,private notificationService:NotificationService, private route:ActivatedRoute) {
    let stompClient = this.webSocketService.connect();
    stompClient.connect({}, frame => {
      stompClient.subscribe('/newspaper/notification', notifications => {
        this.notificationList = [JSON.parse(notifications.body),...this.notificationList];
      })
    });
   }

  ngOnInit() {
    this.loadNotification();
  }

  onclickNotification(){
    this.isNotify = !this.isNotify;
    if(this.isNotify){
      this.loadNotification();
    }
  }

  onActive() {
    this.isNotify = !this.isNotify;
  }

  loadNotification(){
    const params: Params = {
      page:this.page,
      limit:this.offset,
      sortDir:this.sortDir,
    }
    this.notificationService.getNotificationList(params).subscribe({
      next:value=>{
        if(value.code == CodeEnum.SUCCESS){
          this.page = value.data.pageNumber + 1;
          this.notificationList = value.data.content;
        }
      },
    })
  }
}
