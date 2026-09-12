import { Company } from "../../generated/prisma/client";

export interface CompanyState {
  items: Company[];
  loading: boolean;
  error: Error | null;
}
