import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DietWindowComponent } from './diet-window.component';

describe('DietWindowComponent', () => {
  let component: DietWindowComponent;
  let fixture: ComponentFixture<DietWindowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DietWindowComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DietWindowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
