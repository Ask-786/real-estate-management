import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter',
  standalone: true,
})
export class FilterPipe implements PipeTransform {
  transform(value: unknown[], filter: string): unknown[] {
    if(filter === '') return value;
    return value.filter((element) => {
      return JSON.stringify(element).toLowerCase().includes(filter.toLowerCase()) ?? undefined;
    });
  }
}
