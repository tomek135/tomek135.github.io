import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DzialalnoscSummaryComponent } from './dzialalnosc-summary.component';

describe('DzialalnoscSummaryComponent', () => {
  let component: DzialalnoscSummaryComponent;
  let fixture: ComponentFixture<DzialalnoscSummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DzialalnoscSummaryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DzialalnoscSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
