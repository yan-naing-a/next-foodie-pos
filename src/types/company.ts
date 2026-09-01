import { Company } from "../../generated/prisma/client";

export interface CompanyState {
  items: Company[];
  loading: boolean;
  error: Error | null;
}

interface BaseOption {
  onSuccess?: (data?: any) => void;
  onError?: (data?: any) => void;
}

export interface CreateCompanyOption extends BaseOption {}

export interface UpdateCompanyOption extends BaseOption {
  id: number;
}
export interface DeleteCompanyOption extends BaseOption {
  id: number;
}
