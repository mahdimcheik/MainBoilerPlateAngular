import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SmartGridComponent } from './smart-grid.component';

describe('SmartGridComponent', () => {
  let component: SmartGridComponent;
  let fixture: ComponentFixture<SmartGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SmartGridComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SmartGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
