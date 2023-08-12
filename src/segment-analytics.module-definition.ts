import { ConfigurableModuleBuilder } from '@nestjs/common';
import type { AnalyticsSettings } from '@segment/analytics-node';

export const { ConfigurableModuleClass, MODULE_OPTIONS_TOKEN } =
  new ConfigurableModuleBuilder<AnalyticsSettings>()
    .setExtras(
      {
        isGlobal: true,
      },
      (definition, extras) => ({
        ...definition,
        global: extras.isGlobal,
      }),
    )
    .build();
