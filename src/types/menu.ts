import { Menu } from "../../generated/prisma/client";

export interface MenuState {
  items: Menu[];
  loading: boolean;
  error: Error | null;
}

interface BaseOption {
  onSuccess?: (data?: any) => void;
  onError?: (data?: any) => void;
}

export interface CreateMenuOption extends BaseOption {
  name: string;
  price: number;
  description?: string;
  assetUrl?: string;
  menuCategoryIds: number[];
  addonCategoryIds?: number[];
}
export interface UpdateMenuOption extends BaseOption {
  id: number;
  name: string;
  price: number;
  description?: string;
  assetUrl?: string;
  menuCategoryIds: number[];
  addonCategoryIds?: number[];
}
export interface DeleteMenuOption extends BaseOption {
  id: number;
}
