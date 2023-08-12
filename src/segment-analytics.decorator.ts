import { Inject } from '@nestjs/common';
import { getAnalyticsToken } from './segment-analytics.utils';

export const InjectAnalytics = (): ReturnType<typeof Inject> =>
  Inject(getAnalyticsToken());
