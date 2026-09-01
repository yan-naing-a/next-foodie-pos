import { MenuAddonCategory } from "../../generated/prisma/browser";

export interface MenuAddonCategoryState {
  items: MenuAddonCategory[];
  loading: boolean;
  error: Error | null;
}

interface BaseOption {
  onSuccess?: (data?: any) => void;
  onError?: (data?: any) => void;
}

export interface CreateMenuAddonCategoryOption extends BaseOption {}

export interface UpdateMenuAddonCategoryOption extends BaseOption {
  id: number;
}
export interface DeleteMenuAddonCategoryOption extends BaseOption {
  id: number;
}
