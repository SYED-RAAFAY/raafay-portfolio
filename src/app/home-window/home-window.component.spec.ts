import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeWindowComponent } from './home-window.component';

describe('HomeWindowComponent', () => {
  let component: HomeWindowComponent;
  let fixture: ComponentFixture<HomeWindowComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HomeWindowComponent]
    });
    fixture = TestBed.createComponent(HomeWindowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
