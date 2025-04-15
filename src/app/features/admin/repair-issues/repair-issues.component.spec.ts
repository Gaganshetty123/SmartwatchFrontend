import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RepairIssuesComponent } from './repair-issues.component';

describe('RepairIssuesComponent', () => {
  let component: RepairIssuesComponent;
  let fixture: ComponentFixture<RepairIssuesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RepairIssuesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RepairIssuesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
