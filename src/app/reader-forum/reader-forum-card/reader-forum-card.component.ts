import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-reader-forum-card',
  templateUrl: './reader-forum-card.component.html',
  styleUrls: ['./reader-forum-card.component.css']
})
export class ReaderForumCardComponent {

  @Input() image;
  @Input() title: string;
  @Input() content: string;;
  @Input() data;

}
