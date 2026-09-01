import { MenuCategoryMenu } from "../../generated/prisma/browser";

export interface MenuCategoryMenuState {
  items: MenuCategoryMenu[];
  loading: boolean;
  error: Error | null;
}

interface BaseOption {
  onSuccess?: (data?: any) => void;
  onError?: (data?: any) => void;
}

export interface CreateMenuCategoryMenuOption extends BaseOption {}

export interface UpdateMenuCategoryMenuOption extends BaseOption {
  id: number;
}
export interface DeleteMenuCategoryMenuOption extends BaseOption {
  id: number;
}
