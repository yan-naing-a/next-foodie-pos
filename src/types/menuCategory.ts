import { MenuCategory } from "../../generated/prisma/browser";

export interface MenuCategoryState {
  items: MenuCategory[];
  loading: boolean;
  error: Error | null;
}

interface BaseOption {
  onSuccess?: (data?: any) => void;
  onError?: (data?: any) => void;
}

export interface CreateMenuCategoryOption extends BaseOption {
  name: string;
  menuIds: number[];
}

export interface UpdateMenuCategoryOption extends BaseOption {
  id: number;
}
export interface DeleteMenuCategoryOption extends BaseOption {
  id: number;
}
