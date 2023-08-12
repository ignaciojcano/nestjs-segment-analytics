import { Analytics, AnalyticsSettings } from '@segment/analytics-node';
import { Test, TestingModule } from '@nestjs/testing';
import { SegmentAnalyticsModule } from './segment-analytics.module';
import { MODULE_OPTIONS_TOKEN } from './segment-analytics.module-definition';
import { getAnalyticsToken } from './segment-analytics.utils';

describe('SegmentAnalytics', () => {
  let module: TestingModule;
  let analytics: Analytics;
  let options: AnalyticsSettings;

  beforeEach(async () => {
    module = await Test.createTestingModule({
      imports: [
        SegmentAnalyticsModule.register({
          writeKey: 'testing_key',
        }),
      ],
    }).compile();

    analytics = module.get(getAnalyticsToken());
    options = module.get(MODULE_OPTIONS_TOKEN);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(module).toBeDefined();
    expect(analytics).toBeDefined();
  });

  it('should be an instance of Analytics', () => {
    expect(analytics).toBeInstanceOf(Analytics);
  });

  it('should register with the passed options', () => {
    expect(options).toEqual({ writeKey: 'testing_key' });
  });
});
