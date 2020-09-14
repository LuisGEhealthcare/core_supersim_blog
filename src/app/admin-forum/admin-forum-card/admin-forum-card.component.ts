import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-admin-forum-card',
  templateUrl: './admin-forum-card.component.html',
  styleUrls: ['./admin-forum-card.component.css']
})
export class AdminForumCardComponent implements OnInit {

  @Input() image;
  @Input() title: string;
  @Input() content: string;;
  @Input() data;

  constructor() { }

  ngOnInit(): void {
  }

}
