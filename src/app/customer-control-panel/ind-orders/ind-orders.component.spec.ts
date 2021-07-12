import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndOrdersComponent } from './ind-orders.component';

describe('IndOrdersComponent', () => {
  let component: IndOrdersComponent;
  let fixture: ComponentFixture<IndOrdersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IndOrdersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IndOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
