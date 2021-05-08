import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'descriptionPipe',
  pure: true
})
export class DescriptionPipe implements PipeTransform {
 /*pipe that transform thr disctiption of the item if its long to shorter 
  text showing 70 character from the begining and 70 from the end separated with ...
 */
        transform(value: any, ...args: number[]): any {
          if(value){
            if(value.length < 140) return value;
            else{
              return value.slice(0,70)+" ... "+ value.slice(value.length-77,value.length);
            }
      }
  }

}
