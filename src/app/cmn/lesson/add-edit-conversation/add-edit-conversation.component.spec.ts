import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditConversationComponent } from './add-edit-conversation.component';

describe('AddEditConversationComponent', () => {
  let component: AddEditConversationComponent;
  let fixture: ComponentFixture<AddEditConversationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditConversationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditConversationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
