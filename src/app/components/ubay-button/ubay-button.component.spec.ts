import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UbayButtonComponent } from './ubay-button.component';
import { UbayButtonModule } from './ubay-button.module';

describe('UbayButtonComponent', () => {
  let component: UbayButtonComponent;
  let fixture: ComponentFixture<UbayButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        UbayButtonModule,
      ],
      declarations: []
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UbayButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('data input should set _data', async(() => {
    component.data = "test";
    expect(component._data).toBe("test");
  }));
});
