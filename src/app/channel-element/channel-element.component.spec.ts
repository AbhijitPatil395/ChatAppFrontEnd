import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChannelElementComponent } from './channel-element.component';

describe('ChannelElementComponent', () => {
  let component: ChannelElementComponent;
  let fixture: ComponentFixture<ChannelElementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChannelElementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChannelElementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
