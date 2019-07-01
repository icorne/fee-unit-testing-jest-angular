import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'translate'})
export class StubbedTranslatePipe implements PipeTransform {
  transform(value: any, ...args: any[]) {
    return value;
  }
}
