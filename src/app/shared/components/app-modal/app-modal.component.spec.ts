import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppModalComponent } from './app-modal.component';

describe('AppModalComponent', () => {
  let fixture: ComponentFixture<AppModalComponent>;
  let component: AppModalComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppModalComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AppModalComponent);
    component = fixture.componentInstance;
  });

  it('should render dialog only when open', () => {
    fixture.componentRef.setInput('open', false);
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('[role="dialog"]')).toBeNull();

    fixture.componentRef.setInput('open', true);
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('[role="dialog"]')).not.toBeNull();
  });

  it('should emit close when clicking close button', () => {
    fixture.componentRef.setInput('open', true);
    fixture.detectChanges();

    const handler = jest.fn();
    component.close.subscribe(handler);

    const closeBtn: HTMLButtonElement =
      fixture.nativeElement.querySelector('.modal__close');
    closeBtn.click();

    expect(handler).toHaveBeenCalledTimes(1);
  });

  it('should emit close on escape only when open', () => {
    const handler = jest.fn();
    component.close.subscribe(handler);

    fixture.componentRef.setInput('open', false);
    fixture.detectChanges();
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
    expect(handler).not.toHaveBeenCalled();

    fixture.componentRef.setInput('open', true);
    fixture.detectChanges();
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
    expect(handler).toHaveBeenCalledTimes(1);
  });

  it('should emit close when backdrop click originates from backdrop element', () => {
    fixture.componentRef.setInput('open', true);
    fixture.detectChanges();

    const handler = jest.fn();
    component.close.subscribe(handler);

    const backdrop: HTMLElement = fixture.nativeElement.querySelector(
      '.modal__backdrop',
    );

    component.onBackdropClick({
      target: backdrop,
      currentTarget: backdrop,
    } as unknown as MouseEvent);

    expect(handler).toHaveBeenCalledTimes(1);
  });

  it('should not emit close when backdrop click originates from inside panel', () => {
    fixture.componentRef.setInput('open', true);
    fixture.detectChanges();

    const handler = jest.fn();
    component.close.subscribe(handler);

    const backdrop: HTMLElement = fixture.nativeElement.querySelector(
      '.modal__backdrop',
    );
    const panel: HTMLElement =
      fixture.nativeElement.querySelector('.modal__panel');

    component.onBackdropClick({
      target: panel,
      currentTarget: backdrop,
    } as unknown as MouseEvent);

    expect(handler).not.toHaveBeenCalled();
  });
});

