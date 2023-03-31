import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'contact'
})
export class ContactPipe implements PipeTransform {

  transform(cellNumber: number): string {
    const isNumber = (n) => {
      return !isNaN(parseInt(n)) && isFinite(n);
    }
    if(cellNumber && isNumber(cellNumber)){
      let pre = '+27';
      return pre + cellNumber;

    } else return '?';
  }

}
