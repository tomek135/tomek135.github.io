import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UmowaOPraceComponent } from './umowa-oprace.component';

describe('UmowaOPraceComponent', () => {
  let component: UmowaOPraceComponent;
  let fixture: ComponentFixture<UmowaOPraceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UmowaOPraceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UmowaOPraceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
