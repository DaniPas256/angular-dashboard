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
  const localStorageMock = (function() {
  let store : { [key: string]: string } = {};
  return {
    getItem: function(key : string) {
      return store[key] || '';
    },
    setItem: function(key : string, value : string) {
      store[key] = value.toString();
    },
    clear: function() {
      store = {};
    },
    removeItem: function(key : string) {
      delete store[key];
    }
  };
})();

  beforeEach(() => {
    jest.clearAllMocks();

    TestBed.configureTestingModule({
      providers: [ThemeUiService, { provide: DOCUMENT, useValue: mockDocument }],
    });

    service = TestBed.inject(ThemeUiService);
    Object.defineProperty(window, 'localStorage', { value: localStorageMock });
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should set dark or light mode', () => {
    expect(service).toBeTruthy();

    const mode = service.mode();
    expect(['light', 'dark']).toContain(mode);
  });

  it('should toggle between dark and light mode', async () => {
    const currentMode = service.mode();

    service.toggle();

    const newMode = service.mode();
    expect(newMode).not.toBe(currentMode);
  });

  it('should save mode to localStorage', () => {
    const setItemSpy = jest.spyOn(window.localStorage, 'setItem').mockImplementation(() => {});
    
    service.toggle();
    TestBed.tick(); 

    expect(setItemSpy).toHaveBeenCalledWith(
      'portfolio-admin-theme',
      service.mode()
    );
  });  
});
