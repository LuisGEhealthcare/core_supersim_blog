import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReaderForumComponent } from './reader-forum.component';
import { ReaderForumCardComponent } from './reader-forum-card/reader-forum-card.component';
import { ReaderForumCardModule } from './reader-forum-card/reader-forum-card.module';



@NgModule({
  declarations: [ ReaderForumComponent ],
  imports: [ CommonModule, ReaderForumCardModule]
})
export class ReaderForumModule { }
