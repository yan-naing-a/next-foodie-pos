import { Location } from "../../generated/prisma/browser";

export interface LocationState {
  items: Location[];
  loading: boolean;
  error: Error | null;
}

interface BaseOption {
  onSuccess?: (data?: any) => void;
  onError?: (data?: any) => void;
}

export interface CreateLocationOption extends BaseOption {}

export interface UpdateLocationOption extends BaseOption {
  id: number;
}
export interface DeleteLocationOption extends BaseOption {
  id: number;
}
