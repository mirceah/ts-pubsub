import { Observable, Subject } from 'rxjs';
import { filter } from 'rxjs/operators';

import { PubSubEvent } from './pubsub.models';

/** Generic type T are the accepted event types */
export class PubSubService<T> {
  readonly _pubsubSubject: Subject<PubSubEvent<T>>;

  constructor() {
    this._pubsubSubject = new Subject<PubSubEvent<T>>();
  }

  /**
   * @name publish
   * @description Publishes an event having type `T`
   * @param ev
   * Event of type `PubSubEvent<T>` to emit
   */
  publish(ev: PubSubEvent<T>): void {
    this._pubsubSubject.next(ev);
  }

  /**
   * @name watch
   * @description Register to all events of types `T[]`
   * @param evTypes
   * List of event types to listen to
   * @returns Observable stream of events of type `evTypes`
   */
  watch(evTypes: T[]): Observable<PubSubEvent<T>> {
    return this._pubsubSubject
      .asObservable()
      .pipe(filter((ev) => evTypes.some((type) => type === ev.type)));
  }
}
