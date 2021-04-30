import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'descriptionPipe',
  pure: true
})
export class DescriptionPipe implements PipeTransform {

  transform(value: any, ...args: number[]): unknown {

    if(value.length < 140) return value;
    else{
      return value.slice(0,70)+" ... "+ value.slice(value.length-77,value.length);
    }

    
  }

}
