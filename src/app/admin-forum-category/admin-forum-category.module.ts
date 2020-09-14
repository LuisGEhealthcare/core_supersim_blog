import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminForumCategoryComponent } from './admin-forum-category.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MessageModule } from '../components/message/message.module';

@NgModule({
  declarations: [ AdminForumCategoryComponent ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    MessageModule
  ]
})
export class AdminForumCategoryModule { }
