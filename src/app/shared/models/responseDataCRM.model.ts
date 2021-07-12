export interface ResponseDataCRM<T> {
  state: boolean;
  data: T[];
  message: string;
}
export interface ResponseDataCRMWithObjectData<T> {
  state: boolean;
  data: T;
  message: { value: string, code: number }[];
}
export interface ResponseDataCRMWithObjectDataForLogin<T> {
  state: boolean;
  data: T;
  message: { value: string, code: number }[];
}

export interface ResponseDataCRMWithPaging<T> {
  state: boolean;
  data: { model: T[]; totalCount: number; totalCountInPages: number };
  message: string;
}
export interface ObjectWithPaging<T> {
  model: T[];
  totalCount: number;
  totalCountInPages: number;
}
export interface ResponseDataCRMForContractTemplate<T> {
  state: boolean;
  data: { value: T };
  message: string;
}
export interface ResponseDataCRMWithDeleting {
  state: boolean;
  data: { value: boolean; data: string };
  message: string;
}
