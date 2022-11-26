import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { NotificationType } from 'src/app/enums/notification-type';
import { removeNotification } from 'src/app/store/actions/post.action';
import { IAppState } from 'src/app/store/reducers';
import { INotification } from 'src/app/types/notification';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {

  @Input()
  notification!: INotification;

  background: string = "bg-danger w-25 p-1";

  constructor(private store: Store<IAppState>) { }

  ngOnInit(): void {
    switch (this.notification.type) {
      case NotificationType.Error:
        this.background = "bg-danger w-25 p-1 mb-2";
        break;
      case NotificationType.Success:
        this.background = "bg-primary w-25 p-1 mb-2";
        break;
      case NotificationType.Information:
        this.background = "bg-info w-25 p-1 mb-2";
        break;
    }
    if (this.notification.duration != undefined && this.notification.duration > 0) {

      setTimeout(() => {
        this.removeNotification()
      }, this.notification.duration)
    }
  }

  removeNotification() {
    console.log("This");

    this.store.dispatch(removeNotification({ payload: this.notification }));
  }

}
