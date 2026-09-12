import { MenuAddonCategory } from "../../generated/prisma/browser";

export interface MenuAddonCategoryState {
  items: MenuAddonCategory[];
  loading: boolean;
  error: Error | null;
}
