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

export interface CreateAddonCategoryOption extends BaseOption {
  name: string;
  menuIds: number[];
  isRequired: boolean;
}

export interface UpdateAddonCategoryOption extends BaseOption {
  id: number;
  name: string;
  menuIds: number[];
  isRequired: boolean;
}
export interface DeleteAddonCategoryOption extends BaseOption {
  id: number;
}
