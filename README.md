<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>
<p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
<p align="center">
  <a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
  <a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
  <a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
  <a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
  <a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
  <a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
  <a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
  <a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
  <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>

## Description

[Segment Analytics](https://github.com/segmentio/analytics-next/tree/master/packages/node) module for [Nest](https://github.com/nestjs/nest)

## Installation

To begin using it, we first install the required dependencies.

```bash
$ npm install nestjs-segment-analytics @segment/analytics-node
```

## Getting Started

Once the installation process is complete, we can import the `SegmentAnalyticsModule`. Typically, we'll import it into the root `AppModule` and control its behavior using the `.register()` static method. During this step, the segment `Analytics` instance is created. Later, we'll see how we can access the Analytics instance our other feature modules.

```typescript
import { SegmentAnalyticsModule } from 'nestjs-segment-analytics';

@Module({
  imports: [
    SegmentAnalyticsModule.register({
      writeKey: '<your key>',
    }),
  ],
  providers: [AppService],
})
export class AppModule {}
```

## Use module globally

When you want to use `SegmentAnalyticsModule` in other modules, you'll need to import it (as is standard with any Nest module). Alternatively, declare it as a global module by setting the options object's isGlobal property to true, as shown below. In that case, you will not need to import `SegmentAnalyticsModule` in other modules once it's been loaded in the root module (e.g., `AppModule`).

```typescript
SegmentAnalyticsModule.register({
  isGlobal: true,
});
```

> Hint
> The register method accepts all values from `AnalyticsSettings` and passes it to the `Analytics` constructor, you can see all options [here](https://github.com/segmentio/analytics-next/blob/master/packages/node/src/app/settings.ts).

## Using the ConfigService

To access our segment `Analytics` instance, we first need to inject `Analytics`. As with any provider, we need to import its containing module - the `SegmentAnalyticsModule` - into the module that will use it (unless you set the `isGlobal` property in the options object passed to the `SegmentAnalyticsModule.register()` method to true). Import it into a feature module as shown below.

```typescript
// feature.module.ts
@Module({
  imports: [SegmentAnalyticsModule],
  // ...
})
```

Then we can inject it using standard constructor injection:

```typescript
import { InjectAnalytics } from 'nestjs-segment-analytics';
import { Analytics } from '@segment/analytics-node';
// ...

constructor(@InjectAnalytics() private analytics: Analytics) {}
```

> HINT
> The `Analytics` is imported from the `@segment/analytics-node` package.

And use it in our class:

```typescript
await this.analytics.track({
  userId,
  event: 'Create Item',
  properties: { itemId: '564897' },
});
```

## License

[MIT licensed](LICENSE)
