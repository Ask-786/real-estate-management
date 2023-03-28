import { NotificationEffects } from './store/effects';
import { reducers } from './store/reducers';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { MaterialModule } from './../material/material.module';
import { NotificationsSocketService } from './services/notifications-socket.service';
import { NotificationService } from './../../shared/services/notification.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NotificationsRoutingModule } from './notifications-routing.module';
import { NotificationComponent } from './components/notification/notification.component';
import { NotificationsComponent } from './notifications.component';
import { SocketIoConfig, SocketIoModule } from 'ngx-socket-io';

const config: SocketIoConfig = {
  url: 'http://localhost:3000/notification',
  options: {},
};

@NgModule({
  declarations: [NotificationComponent, NotificationsComponent],
  imports: [
    CommonModule,
    NotificationsRoutingModule,
    MaterialModule,
    SocketIoModule.forRoot(config),
    StoreModule.forFeature('notifications', reducers),
    EffectsModule.forFeature([NotificationEffects]),
  ],
  providers: [NotificationService, NotificationsSocketService],
})
export class NotificationsModule {}
