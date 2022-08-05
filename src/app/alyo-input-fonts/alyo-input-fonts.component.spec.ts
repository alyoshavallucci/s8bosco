import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AlyoInputFontsComponent } from './alyo-input-fonts.component';

// <!--versione 2.0-->

describe('AlyoInputFontsComponent', () => {
  let component: AlyoInputFontsComponent;
  let fixture: ComponentFixture<AlyoInputFontsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlyoInputFontsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AlyoInputFontsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
