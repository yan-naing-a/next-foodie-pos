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

export interface EditMenuCategoryMenu {
  id: number;
  items: MenuCategoryMenu[];
}

export interface RemoveMenuCategoryMenu {
  id: number;
}

export interface EditMenuCategoryMenuPayload extends BaseOption {
  items: { menuId: number; menuCategoryId: number }[];
}
