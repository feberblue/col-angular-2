import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QueryokComponent } from './queryok.component';

describe('QueryokComponent', () => {
  let component: QueryokComponent;
  let fixture: ComponentFixture<QueryokComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QueryokComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QueryokComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
