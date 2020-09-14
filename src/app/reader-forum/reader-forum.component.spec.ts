import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReaderForumComponent } from './reader-forum.component';

describe('ReaderForumComponent', () => {
  let component: ReaderForumComponent;
  let fixture: ComponentFixture<ReaderForumComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReaderForumComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReaderForumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
