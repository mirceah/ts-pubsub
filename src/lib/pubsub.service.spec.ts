import { PubSubEvent } from './pubsub.models';
import { PubSubService } from './pubsub.service';

interface EventTypes {
  t1: { name: string };
  t2: { age: number };
}

type EventIds = keyof EventTypes;

describe('PubSubService', () => {
  let pubSubService: PubSubService<EventIds>;
  beforeEach(() => {
    pubSubService = new PubSubService<EventIds>();
  });
  it('is created successfully', () => {
    expect(pubSubService).toBeTruthy();
  });

  it('allows sending new event', () => {
    expect(pubSubService.publish).toBeTruthy();
  });

  describe('Subscription for types', () => {
    const emitT1Event = (): void => {
      const data: PubSubEvent<'t1', EventTypes['t1']> = {
        type: 't1',
        data: { name: 'peanuts' },
      };
      pubSubService.publish(data);
    };

    it('receives event for the registered type', (done) => {
      expect.assertions(1);

      pubSubService.watch(['t1']).subscribe((ev) => {
        expect((ev.data as EventTypes['t1']).name).toBe('peanuts');
        done();
      });

      emitT1Event();
    });

    it('receives event if type is part of multiple registered types', (done) => {
      expect.assertions(1);
      pubSubService.watch(['t1', 't2']).subscribe((ev) => {
        expect((ev.data as EventTypes['t1']).name).toBe('peanuts');
        done();
      });

      emitT1Event();
    });
  });
});
