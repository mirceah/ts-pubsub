export interface PubSubEvent<T, D = unknown> {
  type: T;
  data: D;
}
