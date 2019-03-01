import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailSetFxComponent } from './detailsetfx.component';

describe('DetailSetFxComponent', () => {
  let component: DetailSetFxComponent;
  let fixture: ComponentFixture<DetailSetFxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailSetFxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailSetFxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
