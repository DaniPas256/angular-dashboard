import { AppButtonComponent } from './../../../shared/components/app-button/app-button.component';
import { AppInputComponent } from './../../../shared/components/app-input/app-input.component';
import { UserFormComponent } from './user-form.component';
import { TestBed } from "@angular/core/testing"

describe('UserForm', () => {
  let fixture;
  let component : UserFormComponent;

  const mockFormData = {
      name: 'Test',
      email: 'test@test.com',
      role: 'Dev'
  };

  beforeEach( () => { 
    TestBed.configureTestingModule({
      imports: [UserFormComponent, AppInputComponent, AppButtonComponent]
    })

    fixture = TestBed.createComponent(UserFormComponent)
    component = fixture.componentInstance;

    component.form.reset();
    fixture.detectChanges();
  })

  it('should be invalid when empty', () => {
    expect(component.form.valid).toBe(false);
  })

  it('should be valid when correctly filled', () => {
    component.form.setValue(mockFormData)

    expect(component.form.valid).toBeTruthy();
  })

  it('should require valid email', () => {
    component.form.controls.email.setValue('invalid');

    expect(component.form.controls.email.invalid).toBe(true);
  });  

  it('should require name', () => {
    component.form.controls.name.setValue('');

    expect(component.form.controls.name.invalid).toBe(true);
  });  

  it('should submit when valid', () => {
    const emitSpy = jest.spyOn(component.saved, 'emit');

    component.submit();

    expect(emitSpy).not.toHaveBeenCalled();

    component.form.setValue(mockFormData);
    component.submit()

    expect(emitSpy).toHaveBeenCalledTimes(1);
  })

  it('should submit cancelled event', () => {
    const emitSpy = jest.spyOn(component.cancelled, 'emit');
    component.cancel();

    expect(emitSpy).toHaveBeenCalledTimes(1);
  })  
})