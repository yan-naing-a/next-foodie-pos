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

export interface CreateLocationOption extends BaseOption {
  name: string;
  address: string;
}

export interface UpdateLocationOption extends BaseOption {
  id: number;
  name: string;
  address: string;
}
export interface DeleteLocationOption extends BaseOption {
  id: number;
}
