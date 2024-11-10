// translate.pipe.ts
import { Pipe, PipeTransform } from '@angular/core';
import { Translation } from '../constants/en';

@Pipe({
  name: 'translate',
  standalone: true,
})
export class TranslatePipe implements PipeTransform {
  transform(value: string): string {
    if (!value) {
      return '';
    }

    const keys = value.split('.');
    let result: any = Translation;

    for (const key of keys) {
      result = result[key];
      if (result === undefined || result === null) {
        return value;
      }
    }

    return result;
  }
}
