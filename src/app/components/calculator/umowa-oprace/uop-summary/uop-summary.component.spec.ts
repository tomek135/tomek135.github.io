import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UopSummaryComponent } from './uop-summary.component';

describe('UopSummaryComponent', () => {
  let component: UopSummaryComponent;
  let fixture: ComponentFixture<UopSummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UopSummaryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UopSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
