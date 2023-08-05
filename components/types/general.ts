export type LogMetadata = {
  redirect: string;
  description: string;
  x_request_id: string;
};

export type LogAction = {
  id: string;
  object: string;
  name: string;
};

export type LogData = {
  id: string;
  object: string;
  actor_id: string;
  actor_name: string;
  group: string;
  action: LogAction;
  target_id: string;
  target_name: string;
  location: string;
  occurred_at: Date;
  metadata: LogMetadata;
};
