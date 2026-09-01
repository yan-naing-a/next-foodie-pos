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
  id: number;
}
export interface UpdateMenuOption extends BaseOption {
  id: number;
}
export interface DeleteMenuOption extends BaseOption {
  id: number;
}
