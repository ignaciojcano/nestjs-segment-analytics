import { Module } from '@nestjs/common';
import type { AnalyticsSettings } from '@segment/analytics-node';
import { Analytics } from '@segment/analytics-node';
import {
  ConfigurableModuleClass,
  MODULE_OPTIONS_TOKEN,
} from './segment-analytics.module-definition';
import { getAnalyticsToken } from './segment-analytics.utils';

@Module({
  providers: [
    {
      provide: getAnalyticsToken(),
      inject: [MODULE_OPTIONS_TOKEN],
      useFactory: (options: AnalyticsSettings) => new Analytics(options),
    },
  ],
  exports: [getAnalyticsToken()],
})
export class SegmentAnalyticsModule extends ConfigurableModuleClass {}
