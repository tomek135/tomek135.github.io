import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DzialanoscComponent } from './dzialanosc.component';

describe('DzialanoscComponent', () => {
  let component: DzialanoscComponent;
  let fixture: ComponentFixture<DzialanoscComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DzialanoscComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DzialanoscComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
