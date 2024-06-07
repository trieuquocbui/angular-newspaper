import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppEnum } from 'src/app/helpers/app';
import { CodeEnum } from 'src/app/helpers/code';
import { PagenationEnum } from 'src/app/helpers/pagenation';
import { Notification } from 'src/app/models/notification';
import { Params } from 'src/app/models/params';
import { NotificationService } from 'src/app/services/notification.service';
import { WebsocketService } from 'src/app/services/websocket.service';

@Component({
  selector: 'app-notification-list',
  templateUrl: './notification-list.component.html',
  styleUrls: ['./notification-list.component.css']
})
export class NotificationListComponent implements OnInit, OnDestroy {
  public show: boolean = false;
  public notificationList:Notification[] = [];
  page:number = PagenationEnum.DEFAULT_PAGE;
  offset:number = PagenationEnum.DEFAULT_LIMIT;
  sortDir:string = PagenationEnum.DEFAULT_SORTDIR;
  pathImageFile:String = AppEnum.PATH_IMAGE_FIME;

  constructor(private webSocketService:WebsocketService,private notificationService:NotificationService,private route:ActivatedRoute) {
    let stompClient = this.webSocketService.connect();
    stompClient.connect({}, frame => {
      stompClient.subscribe('/newspaper/notification', notifications => {
        this.notificationList = [JSON.parse(notifications.body),...this.notificationList];
      })

      stompClient.subscribe('/newspaper/delete/notification',message =>{
        let newspaperId = JSON.parse(message.body);
        this.notificationList = this.notificationList.filter(notification => notification.newspaperId != newspaperId);
      })
    });
   }


  ngOnDestroy(): void {
    this.webSocketService.disconnect();
  }

  ngOnInit() {
    this.route.queryParams.subscribe((params) =>{
      this.page = params['page'] || PagenationEnum.DEFAULT_PAGE;
      this.offset = params['offset'] || PagenationEnum.DEFAULT_LIMIT;
      this.sortDir = params['sortDir'] || "desc";
      this.loadNotification();
    })
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
          if(value.data.lastPage){
            this.show = false;
          }else{
            this.show = true;
          }
          this.page = value.data.pageNumber + 1;
          this.notificationList = [...value.data.content,...this.notificationList];
        }
      },
    })
  }

  showNewspaper() {
    ++this.page;
    this.loadNotification()
  }

}
