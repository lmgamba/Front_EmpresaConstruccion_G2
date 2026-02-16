import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuildFlow } from './build-flow';

describe('BuildFlow', () => {
  let component: BuildFlow;
  let fixture: ComponentFixture<BuildFlow>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BuildFlow]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BuildFlow);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
