import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter',
  standalone: true,
})
export class FilterPipe implements PipeTransform {
  transform(value: any[], filter: string): string[] {
    return value.filter((element) => {
      const val = JSON.stringify(element);
      if (val.toLowerCase().includes(filter.toLowerCase())) {
        return element;
      }
    });
  }
}
