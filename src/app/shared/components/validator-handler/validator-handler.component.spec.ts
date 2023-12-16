import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidatorHandlerComponent } from './validator-handler.component';

describe('ValidatorHandlerComponent', () => {
  let component: ValidatorHandlerComponent;
  let fixture: ComponentFixture<ValidatorHandlerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ValidatorHandlerComponent]
    });
    fixture = TestBed.createComponent(ValidatorHandlerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
