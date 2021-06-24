export interface ServiceListItem {
  id: string;
  name: string;
  description: string;
  promocode: string;
}

export interface ServiceListResponse {
  data: ServiceListItem[];
  next?: number;
}
