import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'mostRecentFirst'
})
export class MostRecentFirstPipe implements PipeTransform {

  private compare(a, b) {
   
    const createdOnA = a.createdOn;
    const createdOnB = b.createdOn;
    let comparison = 1;
    if(createdOnA > createdOnB) {
      comparison = -1;
    }
    return comparison;
  }

  transform(sms: any[]): any[] {
    if(sms && sms.length > 0) {
      return sms.sort(this.compare);
    }
    return null;
  }

}
