import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MessageAlertComponent } from './message.component';

describe('MessageAlertComponent', () => {
  let component: MessageAlertComponent;
  let fixture: ComponentFixture<MessageAlertComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MessageAlertComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MessageAlertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
