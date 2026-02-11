import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashbordUser } from './dashbord-user';

describe('DashbordUser', () => {
  let component: DashbordUser;
  let fixture: ComponentFixture<DashbordUser>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashbordUser]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashbordUser);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
