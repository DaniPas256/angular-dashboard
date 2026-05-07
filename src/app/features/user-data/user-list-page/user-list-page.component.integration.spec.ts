import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserListPageComponent } from './user-list-page.component';
import { USER_STORE } from '../services/user.service.token';
import { By } from '@angular/platform-browser';
import { UserFormComponent } from '../user-form/user-form.component';
import { computed, signal } from '@angular/core';
import { User } from '../models/user.model';

describe('UserListPageComponent integration', () => {
  let component: UserListPageComponent;
  let fixture: ComponentFixture<UserListPageComponent>;

  const mockUser = {
    id: '1',
    name: 'John Doe',
    role: 'Admin',
    email: 'john@example.com',
  };

  const newUserData = {
    name: 'New User 1',
    email: 'new@user.com',
    role: 'Developer',
  };

  const editedUserData = {
    name: 'John Updated',
    email: 'john.updated@example.com',
    role: 'Manager',
  };

  let users = signal<User[]>([mockUser, { id: '2', ...newUserData }]);

  let mockStore = {
    columns: [
      { key: 'name', label: 'Name', sortable: true },
      { key: 'email', label: 'Email', sortable: true },
      { key: 'role', label: 'Role', sortable: true },
    ],
    delete: jest.fn(),
    view: computed(() => ({ slice: users(), total: users().length })),
    sortKeyForTable: jest.fn().mockReturnValue('name'),
    sortDirForTable: jest.fn().mockReturnValue('asc'),
    page: jest.fn().mockReturnValue(1),
    pageSize: jest.fn().mockReturnValue(10),
    onSaved: jest.fn((savedUser: Partial<User> & { id?: string }) => {
      if (savedUser.id) {
        users.update((currentUsers) =>
          currentUsers.map((user) =>
            user.id === savedUser.id ? ({ ...user, ...savedUser } as User) : user,
          ),
        );
        return;
      }

      users.update((currentUsers) => [
        ...currentUsers,
        { ...savedUser, id: String(currentUsers.length + 1) } as User,
      ]);
    }),
  };

  beforeEach(async () => {
    users.set([mockUser, { id: '2', ...newUserData }]);

    await TestBed.configureTestingModule({
      imports: [UserListPageComponent],
      providers: [{ provide: USER_STORE, useValue: mockStore }],
    }).compileComponents();

    fixture = TestBed.createComponent(UserListPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    jest.clearAllMocks();
  });

  it('Should add new user and display it in the list', () => {
    const addUserButton = fixture.debugElement.query(By.css('.toolbar_addUser'));
    addUserButton.triggerEventHandler('clicked', null);

    fixture.detectChanges();

    expect(component.modalOpen).toBeTruthy();

    const htmlFormElement = fixture.nativeElement.querySelector('.modal');
    expect(htmlFormElement).toBeTruthy();

    const formComponent = fixture.debugElement.query(By.directive(UserFormComponent))
      .componentInstance as UserFormComponent;

    formComponent.form.setValue(newUserData);

    expect(formComponent.form.valid).toBeTruthy();

    const onSavedSpy = jest.spyOn(component.store, 'onSaved');

    const submitSpy = jest.fn();
    formComponent.saved.subscribe(submitSpy);

    const submitButton = fixture.nativeElement.querySelector('.modal button[type="submit"]');
    submitButton.click();

    fixture.detectChanges();

    expect(submitSpy).toHaveBeenCalled();
    expect(onSavedSpy).toHaveBeenCalledWith(expect.objectContaining(newUserData));
    expect(component.modalOpen).toBeFalsy();

    fixture.detectChanges();

    const trElements = fixture.nativeElement.querySelectorAll('tbody tr');
    expect(trElements.length).toBe(3);

    const lastRow = trElements[trElements.length - 1];
    expect(lastRow.textContent).toContain(newUserData.name);
    expect(lastRow.textContent).toContain(newUserData.email);
    expect(lastRow.textContent).toContain(newUserData.role);
  });

  it('Should edit existing user and display updated values in the list', () => {
    component.selectedUser.set(mockUser as User);
    fixture.detectChanges();

    const editButton = fixture.nativeElement.querySelector('.selection__actions .btn');
    editButton.click();
    fixture.detectChanges();

    expect(component.modalOpen).toBeTruthy();
    expect(component.modalMode).toBe('edit');

    const formDebugEl = fixture.debugElement.query(By.directive(UserFormComponent));
    expect(formDebugEl).toBeTruthy();
    const formComponent = formDebugEl.componentInstance as UserFormComponent;

    expect(formComponent.form.value).toEqual({
      name: mockUser.name,
      email: mockUser.email,
      role: mockUser.role,
    });

    formComponent.form.setValue(editedUserData);
    expect(formComponent.form.valid).toBeTruthy();

    const onSavedSpy = jest.spyOn(component.store, 'onSaved');

    const submitButton = fixture.nativeElement.querySelector('.modal button[type="submit"]');
    submitButton.click();

    fixture.detectChanges();

    expect(onSavedSpy).toHaveBeenCalledWith({ id: mockUser.id, ...editedUserData });
    expect(component.modalOpen).toBeFalsy();

    const trElements = fixture.nativeElement.querySelectorAll('tbody tr');
    const firstRow = trElements[0];
    expect(firstRow.textContent).toContain(editedUserData.name);
    expect(firstRow.textContent).toContain(editedUserData.email);
    expect(firstRow.textContent).toContain(editedUserData.role);
  });
});
