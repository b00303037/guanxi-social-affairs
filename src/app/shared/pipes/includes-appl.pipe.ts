import { Pipe, PipeTransform } from '@angular/core';
import { ApplInList } from 'src/app/api/models/get-appl-list.models';

@Pipe({
  name: 'includesAppl',
})
export class IncludesApplPipe implements PipeTransform {
  transform(appl: ApplInList, array: Array<ApplInList>): boolean {
    return (
      array.findIndex((a) => a.applicationID === appl.applicationID) !== -1
    );
  }
}
