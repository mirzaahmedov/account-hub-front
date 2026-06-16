import mitt from "mitt";

export type AppEvents = {
  "auth:verify-email": void;
  "auth:logout": void;
};

export const emitter = mitt<AppEvents>();
