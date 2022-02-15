import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OfficeDesignComponent } from './office-design.component';

describe('OfficeDesignComponent', () => {
  let component: OfficeDesignComponent;
  let fixture: ComponentFixture<OfficeDesignComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OfficeDesignComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OfficeDesignComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
