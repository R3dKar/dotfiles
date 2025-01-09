export enum ServiceStatus {
  Unavailable,
  Available
};

export type ServiceData<T> = {
  status: ServiceStatus.Unavailable
} | {
  status: ServiceStatus.Available
} & T;
