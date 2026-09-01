import { Addon } from "../../generated/prisma/client";

export interface AddonState {
  items: Addon[];
  loading: boolean;
  error: Error | null;
}

interface BaseOption {
  onSuccess?: (data?: any) => void;
  onError?: (data?: any) => void;
}

export interface CreateAddonOption extends BaseOption {}

export interface UpdateAddonOption extends BaseOption {
  id: number;
}
export interface DeleteAddonOption extends BaseOption {
  id: number;
}
