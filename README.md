# RxJS + Typescript Pub/Sub implementation

# Project boilerplate

This project was built starting from [typescript-starter](https://github.com/bitjson/typescript-starter) repository.

# TODO

1. Cleanup package.json scripts. Right now there are a lot recipes that might never be used.
2. Add jest-marble tests

# Overview

## Publishers

- Send events: `PubSubEvent<T, D = unknown>`
- Each event has a `type` and payload: `data`.
- The possible event types are generic `PubSubService<T>`

## Subscribers

- Register by specifying event types
- Subscribers can narrow down the event payload type which is otherwise opaque to the PubSubService

## Example

```js
interface EventTypes {
  t1: { name: string };
  t2: { age: number };
}
type EventIds = keyof EventTypes;

const pubSubService = new PubSubService<EventIds>();

// Publisher
const ev: PubSubEvent<'t1', EventTypes['t1']> = {
  type: 't1',
  data: { name: 'peanuts' },
};
pubSubService.publish(ev);

// Subscriber
pubSubService.watch(['t1']).subscribe((ev) => {
  console.log(ev.data as EventTypes['t1']).name;
});
```

# Unit testing

[Jest](https://jestjs.io) is used for unit testing and coverage, replacing `typescript-starter` libraries [Ava](https://github.com/avajs/ava) and [Nyc](https://www.npmjs.com/package/nyc).

## Running unit tests

- `npm run test:unit` runs unit tests and stops
- `npm run watch:test` runs unit tests in watch mode
- `npm run cov` runts unit tets, generates and opens coverage report
