import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppButtonComponent } from './app-button.component';

describe('AppButtonComponent', () => {
  let fixture: ComponentFixture<AppButtonComponent>;
  let component: AppButtonComponent;

  // @ts-ignore
  const mouseEventMock = {
    preventDefault: jest.fn(),
    stopPropagation: jest.fn(),
  } as MouseEvent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppButtonComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AppButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should emit click when enabled and not loading', () => {
    const handler = jest.fn();
    component.clicked.subscribe(handler);

    const btn: HTMLButtonElement = fixture.nativeElement.querySelector('button');
    btn.click();

    expect(handler).toHaveBeenCalledTimes(1);
  });

  it('should not emit click when disabled', () => {
    fixture.componentRef.setInput('disabled', true);
    fixture.detectChanges();

    const handler = jest.fn();
    component.clicked.subscribe(handler);

    const btn = fixture.debugElement.query((de) => de.nativeElement.tagName === 'BUTTON');
    btn.triggerEventHandler('click', mouseEventMock ) 

    expect(handler).not.toHaveBeenCalled();
    expect(mouseEventMock.preventDefault).toHaveBeenCalled();
    expect(mouseEventMock.stopPropagation).toHaveBeenCalled();
  });

  it('should not emit click when loading', () => {
    fixture.componentRef.setInput('loading', true);
    fixture.detectChanges();

    const handler = jest.fn();
    component.clicked.subscribe(handler);

    const btn = fixture.debugElement.query((de) => de.nativeElement.tagName === 'BUTTON');
    btn.triggerEventHandler('click', mouseEventMock ) 

    expect(handler).not.toHaveBeenCalled();
    expect(mouseEventMock.preventDefault).toHaveBeenCalled();
    expect(mouseEventMock.stopPropagation).toHaveBeenCalled();
  });
});

