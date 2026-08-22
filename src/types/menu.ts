import { Menu } from "../../generated/prisma/client";

export interface MenuState {
  items: Menu[];
  loading: boolean;
  error: Error | null;
}
