import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReaderForumCardComponent } from './reader-forum-card.component';

describe('ReaderForumCardComponent', () => {
  let component: ReaderForumCardComponent;
  let fixture: ComponentFixture<ReaderForumCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReaderForumCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReaderForumCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
