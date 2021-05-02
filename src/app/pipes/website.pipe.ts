import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'website'
})
export class WebsitePipe implements PipeTransform {
 
  // pipe used to show the base Website of the link existed in API(URL) 
  transform(value: any, ...args: any[]): unknown {
    return value ? new URL(value).hostname.replace('www.', '') : '';
  }

}
