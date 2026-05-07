import { provideRouter, Router } from '@angular/router';
import { ThemeUiService } from '../services/theme-ui.service';
import { AdminLayoutComponent } from './admin-layout.component';
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { Component } from '@angular/core';

@Component({
  selector: 'app-admin-layout',
  template: '',
})
class DummyComponent {}

describe('AdminLayoutComponent', () => {
  let fixture : ComponentFixture<AdminLayoutComponent>;
  let component: AdminLayoutComponent;

  const themeUiMock = { toggle: jest.fn(), mode: jest.fn().mockReturnValue('light') };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminLayoutComponent],
      providers: [
        {
          provide: ThemeUiService,
          useValue: themeUiMock,
        },
        provideRouter([
          { path: 'dashboard', component: DummyComponent },
          { path: 'users', component: DummyComponent },
          { path: 'snippets', component: DummyComponent }          
        ])
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AdminLayoutComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(fixture).toBeTruthy();
  });
 
  it('should call themeUi.toggle on toggleTheme', () => {
    component.toggleTheme();
    expect(themeUiMock.toggle).toHaveBeenCalled();
  });

  it('should render router links correctly', () => {
    const fixture = TestBed.createComponent(AdminLayoutComponent);
    fixture.detectChanges();

    const links = fixture.nativeElement.querySelectorAll('a');

    expect(links[0].getAttribute('routerLink')).toBe('/dashboard');
    expect(links[1].getAttribute('routerLink')).toBe('/users');
    expect(links[2].getAttribute('routerLink')).toBe('/snippets');
  });
});