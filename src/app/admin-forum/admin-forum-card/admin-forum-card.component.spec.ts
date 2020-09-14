import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminForumCardComponent } from './admin-forum-card.component';

describe('AdminForumCardComponent', () => {
  let component: AdminForumCardComponent;
  let fixture: ComponentFixture<AdminForumCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminForumCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminForumCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
