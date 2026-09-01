import { AddonCategory } from "../../generated/prisma/client";

export interface AddonCategoryState {
  items: AddonCategory[];
  loading: boolean;
  error: Error | null;
}

interface BaseOption {
  onSuccess?: (data?: any) => void;
  onError?: (data?: any) => void;
}

export interface CreateAddonCategoryOption extends BaseOption {}

export interface UpdateAddonCategoryOption extends BaseOption {
  id: number;
}
export interface DeleteAddonCategoryOption extends BaseOption {
  id: number;
}
