import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'isInSet',
})
export class IsInSetPipe implements PipeTransform {
  transform(value: unknown, set: Set<unknown>): boolean {
    return set.has(value);
  }
}
