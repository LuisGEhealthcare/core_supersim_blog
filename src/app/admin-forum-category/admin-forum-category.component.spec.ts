import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminForumCategoryComponent } from './admin-forum-category.component';

describe('AdminForumCategoryComponent', () => {
  let component: AdminForumCategoryComponent;
  let fixture: ComponentFixture<AdminForumCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminForumCategoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminForumCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
