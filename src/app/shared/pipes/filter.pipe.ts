import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'appFilter',
  standalone: true,
})
export class AppFilterPipe implements PipeTransform {
  transform<T>(items: readonly T[] | null | undefined, query: string, key?: keyof T): T[] {
    if (!items?.length) {
      return [];
    }
    const q = query.trim().toLowerCase();
    if (!q) {
      return [...items];
    }
    return items.filter((item) => {
      if (key !== undefined) {
        const v = item[key];
        return String(v ?? '').toLowerCase().includes(q);
      }
      return JSON.stringify(item).toLowerCase().includes(q);
    });
  }
}
