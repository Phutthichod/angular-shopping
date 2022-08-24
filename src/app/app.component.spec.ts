import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { findComponent } from './spec-helpers/element.spec-helper';

fdescribe('AppComponent', () => {
  let app: AppComponent
  let fixture: ComponentFixture<AppComponent>
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    app = fixture.componentInstance;
  });

  fit('should create the app', () => {
    expect(app).toBeTruthy();
  });
 
  fit('renders child component',()=>{
    const headerComponent = findComponent(fixture, 'app-header')
    const routerOutlet = findComponent(fixture, 'router-outlet')
    expect(headerComponent).toBeTruthy();
    expect(routerOutlet).toBeTruthy();
  })
});
