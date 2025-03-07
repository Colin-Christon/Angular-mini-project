import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarComponent } from './navbar.component';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NavbarComponent],
      imports: [RouterTestingModule]
    }).compileComponents();

    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should have a Register button', () => {
    const registerButton = fixture.debugElement.query(By.css('button[routerLink="/home/register"]'));
    expect(registerButton.nativeElement.textContent).toContain('Register');
  });

  it('should have a Configure button', () => {
    const configureButton = fixture.debugElement.query(By.css('button[routerLink="/home/configure"]'));
    expect(configureButton.nativeElement.textContent).toContain('Configure');
  });

  it('should have routerLinkActive on buttons', () => {
    const registerButton = fixture.debugElement.query(By.css('button[routerLink="/home/register"]'));
    const configureButton = fixture.debugElement.query(By.css('button[routerLink="/home/configure"]'));
    expect(registerButton.attributes['routerLinkActive']).toBe('active');
    expect(configureButton.attributes['routerLinkActive']).toBe('active');
  });
});
