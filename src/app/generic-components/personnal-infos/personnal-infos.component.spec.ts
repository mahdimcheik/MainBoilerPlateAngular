import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonnalInfosComponent } from './personnal-infos.component';

describe('PersonnalInfosComponent', () => {
  let component: PersonnalInfosComponent;
  let fixture: ComponentFixture<PersonnalInfosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PersonnalInfosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PersonnalInfosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
