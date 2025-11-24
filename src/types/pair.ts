import type { Nullable } from "./nullable";

export type Pair<Value> = {
  key: Nullable<string>;
  value: Nullable<Value>;
};
