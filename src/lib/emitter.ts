import mitt from "mitt";

export type AppEvents = {
  "auth:verify-email": void;
};

export const emitter = mitt<AppEvents>();
