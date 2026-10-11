import { MenuCategoryMenu } from "../../generated/prisma/browser";

export interface MenuCategoryMenuState {
  items: MenuCategoryMenu[];
  loading: boolean;
  error: Error | null;
}

export interface EditMenuCategoryMenu {
  id: number;
  items: MenuCategoryMenu[];
}
