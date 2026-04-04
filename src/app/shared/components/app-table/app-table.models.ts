export interface AppTableColumn<T> {
  key: keyof T & string;
  label: string;
  sortable?: boolean;
}

export type SortDirection = 'asc' | 'desc' | null;
