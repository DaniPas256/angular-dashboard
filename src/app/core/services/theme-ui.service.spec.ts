import { DOCUMENT } from '@angular/core';
import { ThemeUiService } from './theme-ui.service';
import { TestBed } from '@angular/core/testing';

describe('ThemeUiService', () => {
  let service: ThemeUiService;

  const mockDocument = {
    documentElement: {
      classList: {
        toggle: jest.fn(),
      },
    },
  };

  beforeEach(() => {
    jest.clearAllMocks();   

    TestBed.configureTestingModule({
      providers: [ThemeUiService, { provide: DOCUMENT, useValue: mockDocument }],
    });

    service = TestBed.inject(ThemeUiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  })
  
  it('should set dark or light mode', () => {
    expect(service).toBeTruthy();
    
    const mode = service.mode();
    expect(['light', 'dark']).toContain(mode);
  })

  it('should toggle between dark and light mode', () => {
    const currentMode = service.mode();
    service.toggle();

    const newMode = service.mode();
    expect(newMode).not.toBe(currentMode);
  });
});
