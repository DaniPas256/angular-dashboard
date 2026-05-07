import { Directive, Input } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

@Directive({ selector: '[baseChart]' })
class MockBaseChartDirective {
  @Input() type: unknown;
  @Input() data: unknown;
  @Input() options: unknown;
}

jest.mock('ng2-charts', () => ({
  BaseChartDirective: MockBaseChartDirective,
}));

import { ChartCardComponent } from './chart-card.component';

describe('ChartCardComponent', () => {
  let fixture: ComponentFixture<ChartCardComponent>;
  let component: ChartCardComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChartCardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ChartCardComponent);
    component = fixture.componentInstance;
  });

  it('should render no canvas when data is null', () => {
    fixture.componentRef.setInput('chartType', 'bar' as any);
    fixture.componentRef.setInput('data', null);
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelectorAll('canvas').length).toBe(0);
  });

  it('should expose pieData for pie chartType and render pie canvas', () => {
    const pieData = {
      labels: ['TypeScript'],
      datasets: [{ data: [100], backgroundColor: ['#000'] }],
    };

    fixture.componentRef.setInput('chartType', 'pie' as any);
    fixture.componentRef.setInput('data', pieData as any);
    fixture.detectChanges();

    expect(component.pieData).not.toBeNull();
    expect(component.nonPieData).toBeNull();
    expect(fixture.nativeElement.querySelectorAll('canvas').length).toBe(1);
  });

  it('should expose nonPieData for non-pie chartType and render canvas', () => {
    const nonPieData = {
      labels: ['Auth'],
      datasets: [{ label: 'Hours', data: [10] }],
    };

    fixture.componentRef.setInput('chartType', 'bar' as any);
    fixture.componentRef.setInput('data', nonPieData as any);
    fixture.detectChanges();

    expect(component.pieData).toBeNull();
    expect(component.nonPieData).not.toBeNull();
    expect(fixture.nativeElement.querySelectorAll('canvas').length).toBe(1);
  });
});

