import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogsAdmin } from './logs-admin';

describe('LogsAdmin', () => {
  let component: LogsAdmin;
  let fixture: ComponentFixture<LogsAdmin>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LogsAdmin]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LogsAdmin);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
