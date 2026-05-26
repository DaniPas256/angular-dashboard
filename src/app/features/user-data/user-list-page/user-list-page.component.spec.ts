import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserListPageComponent } from './user-list-page.component';
import { USER_STORE } from '../services/user.service.token';

describe('UserListPageComponent', () => {
  let component: UserListPageComponent;
  let fixture: ComponentFixture<UserListPageComponent>;
  const mockStore = {
    delete: jest.fn(),
    view: jest.fn().mockReturnValue({ slice: [], total: 0 }),
    sortKeyForTable: jest.fn().mockReturnValue('name'),
    sortDirForTable: jest.fn().mockReturnValue('asc'),
    page: jest.fn().mockReturnValue(1),
    pageSize: jest.fn().mockReturnValue(10),
  }

  const mockUser = {
    id: '1',
    name: 'John Doe',
    role: 'Admin',
    email: 'john@example.com'
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserListPageComponent],
      providers: [
        { provide: USER_STORE, useValue: mockStore }
      ]
    }).compileComponents();
    
    fixture = TestBed.createComponent(UserListPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    jest.clearAllMocks();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('openCreate', () => {
    it('should set modalMode to "create"', () => {
      component.openCreate();
      expect(component.modalMode).toBe('create');
    });

    it('should set modalOpen to true', () => {
      component.openCreate();
      expect(component.modalOpen).toBeTruthy();
    });

    it('should clear editingUser', () => {
      component.editingUser = mockUser;
      component.openCreate();
      expect(component.editingUser).toBeNull();
    });
  });

  describe('openEdit', () => {
    it('should set modalMode to "edit"', () => {
      component.openEdit(mockUser);
      expect(component.modalMode).toBe('edit');
    });

    it('should set editingUser to passed user', () => {
      component.openEdit(mockUser);
      expect(component.editingUser).toEqual(mockUser);
    });

    it('should set modalOpen to true', () => {
      component.openEdit(mockUser);
      expect(component.modalOpen).toBeTruthy();
    });
  });

  describe('closeModal', () => {
    it('should close modal and clear editingUser', () => {
      component.modalOpen = true;
      component.editingUser = mockUser;

      component.closeModal();

      expect(component.modalOpen).toBeFalsy();
      expect(component.editingUser).toBeNull();
    });
  });

  describe('deleteUser', () => {
    it('should call store.delete when confirmed', () => {
      jest.spyOn(window, 'confirm').mockReturnValue(true);
      
      component.deleteUser(mockUser);
      expect(mockStore.delete).toHaveBeenCalledWith('1');
    });

    it('should not delete if confirmation is denied', () => {
      jest.spyOn(window, 'confirm').mockReturnValue(false);
      component.deleteUser(mockUser);
      expect(mockStore.delete).not.toHaveBeenCalled();
    });

    it('should clear selection if deleted user is selected', () => {
      component.selectedUser.set(mockUser);
      jest.spyOn(window, 'confirm').mockReturnValue(true);

      const spy = jest.spyOn(component, 'clearSelection');
      component.deleteUser(mockUser);
      expect(spy).toHaveBeenCalled();
      expect(component.selectedUser()).toBeNull();
    });
  });

  describe('userFromRow', () => {
    it('should return user from row', () => {
      const row = { _user: mockUser };
      const result = component.userFromRow(row);
      expect(result).toEqual(mockUser);
    });
  });

  describe('onRowClick', () => {
    it('should set selectedUser to user from row', () => {
      const row = { _user: mockUser };
      component.onRowClick(row);
      expect(component.selectedUser()).toEqual(mockUser);
    });
  });

  describe('clearSelection', () => {
    it('should clear selectedUser', () => {
      component.selectedUser.set(mockUser);
      component.clearSelection();
      expect(component.selectedUser()).toBeNull();
    });
  });
});
