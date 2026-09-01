export interface AppState {
  init: boolean;
  loading: boolean;
  error: Error | null;
}

interface BaseOption {
  onSuccess?: (data?: any) => void;
  onError?: (data?: any) => void;
}

export interface fetchAppOption extends BaseOption {}
