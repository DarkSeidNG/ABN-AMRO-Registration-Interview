import { ComponentRef, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';

import { TranslatePipe } from '../../pipes/translate.pipe';
import { InputComponent } from './input.component';

describe('InputComponent', () => {
  let component: InputComponent;
  let fixture: ComponentFixture<InputComponent>;
  let componentRef: ComponentRef<InputComponent>;
  let inputElement: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        InputComponent,
        FormsModule,
        ReactiveFormsModule,
        TranslatePipe,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(InputComponent);
    component = fixture.componentInstance;
    componentRef = fixture.componentRef;
    inputElement = fixture.debugElement.query(By.css('input'));
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render an input element', () => {
    fixture.detectChanges();
    expect(inputElement).toBeTruthy();
  });

  it('should set the correct type on the input', () => {
    componentRef.setInput('type', 'email');
    fixture.detectChanges();
    expect(inputElement.attributes['type']).toBe('email');

    componentRef.setInput('type', 'password');
    fixture.detectChanges();
    expect(inputElement.attributes['type']).toBe('password');
  });

  it('should set the correct value on the input', () => {
    component.writeValue('Test Value');
    fixture.detectChanges();
    expect(inputElement.nativeElement.value).toBe('Test Value');
  });

  it('should call onChange when input value changes', () => {
    spyOn(component, 'onChange');

    inputElement.nativeElement.value = 'New Value';
    inputElement.nativeElement.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    expect(component.onChange).toHaveBeenCalledWith('New Value');
  });

  it('should call onTouched when input loses focus', () => {
    spyOn(component, 'onTouched');

    inputElement.nativeElement.dispatchEvent(new Event('blur'));
    fixture.detectChanges();

    expect(component.onTouched).toHaveBeenCalled();
  });

  it('should disable the input when setDisabledState is called with true', () => {
    component.setDisabledState(true);
    fixture.detectChanges();
    expect(inputElement.nativeElement.disabled).toBeTrue();
  });

  it('should enable the input when setDisabledState is called with false', () => {
    component.setDisabledState(false);
    fixture.detectChanges();
    expect(inputElement.nativeElement.disabled).toBeFalse();
  });

  it('should display the correct label', () => {
    componentRef.setInput('name', 'username');
    fixture.detectChanges();

    const labelElement = fixture.debugElement.query(By.css('label'));
    expect(labelElement.nativeElement.textContent.trim()).toBe('Username');
  });

  it('should display error message when hasErrors is true', () => {
    spyOnProperty(component, 'hasErrors', 'get').and.returnValue(true);
    fixture.detectChanges();

    const errorElement = fixture.debugElement.query(By.css('.input-error'));
    expect(errorElement).toBeTruthy();
  });

  it('should not display error message when hasErrors is false', () => {
    spyOnProperty(component, 'hasErrors', 'get').and.returnValue(false);
    fixture.detectChanges();

    const errorElement = fixture.debugElement.query(By.css('.input-error'));
    expect(errorElement).toBeNull();
  });
});
