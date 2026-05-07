import { firstValueFrom } from 'rxjs';

import { DashboardDataService } from './dashboard-data.service';

describe('DashboardDataService', () => {
  it('should emit dashboard bundle after delay', async () => {
    jest.useFakeTimers();

    const service = new DashboardDataService();
    const resultPromise = firstValueFrom(service.getDashboard$());

    jest.advanceTimersByTime(450);

    const bundle = await resultPromise;

    expect(bundle.stats).toHaveLength(4);
    expect(bundle.line).toBeDefined();
    expect(bundle.bar).toBeDefined();
    expect(bundle.pie).toBeDefined();
  });
});

