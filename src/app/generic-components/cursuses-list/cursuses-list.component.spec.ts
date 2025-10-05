import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CursusesListComponent } from './cursuses-list.component';

describe('CursusesListComponent', () => {
  let component: CursusesListComponent;
  let fixture: ComponentFixture<CursusesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CursusesListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CursusesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
