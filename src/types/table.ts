import { Table } from "../../generated/prisma/browser";

export interface TableState {
  items: Table[];
  loading: boolean;
  error: Error | null;
}

interface BaseOption {
  onSuccess?: (data?: any) => void;
  onError?: (data?: any) => void;
}

export interface CreateTableOption extends BaseOption {
  name: string;
  locationId: number;
}

export interface UpdateTableOption extends BaseOption {
  id: number;
}
export interface DeleteTableOption extends BaseOption {
  id: number;
}
