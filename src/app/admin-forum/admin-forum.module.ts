import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminForumComponent } from './admin-forum.component';
import { AdminForumCardModule } from './admin-forum-card/admin-forum-card.module';
import { ModalModule } from '../components/modal/modal.module';



@NgModule({
  declarations: [ AdminForumComponent ],
  imports: [
    CommonModule,
    AdminForumCardModule,
    ModalModule
  ]
})
export class AdminForumModule { }
