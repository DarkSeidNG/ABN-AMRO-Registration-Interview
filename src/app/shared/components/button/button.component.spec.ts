import { ComponentRef, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { ButtonComponent } from './button.component';

describe('ButtonComponent', () => {
  let component: ButtonComponent;
  let fixture: ComponentFixture<ButtonComponent>;
  let componentRef: ComponentRef<ButtonComponent>;
  let buttonElement: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ButtonComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ButtonComponent);
    component = fixture.componentInstance;
    componentRef = fixture.componentRef;
    buttonElement = fixture.debugElement.query(By.css('button'));
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render a button element', () => {
    fixture.detectChanges();
    expect(buttonElement).toBeTruthy();
  });

  it('should set the correct button type', () => {
    componentRef.setInput('type', 'submit');
    fixture.detectChanges();
    expect(buttonElement.attributes['type']).toBe('submit');

    componentRef.setInput('type', 'button');
    fixture.detectChanges();
    expect(buttonElement.attributes['type']).toBe('button');
  });

  it('should disable the button when disable is true', () => {
    componentRef.setInput('disable', true);
    fixture.detectChanges();
    expect(buttonElement.properties['disabled']).toBeTrue();
  });

  it('should enable the button when disable is false', () => {
    componentRef.setInput('disable', false);
    fixture.detectChanges();
    expect(buttonElement.properties['disabled']).toBeFalse();
  });
});
