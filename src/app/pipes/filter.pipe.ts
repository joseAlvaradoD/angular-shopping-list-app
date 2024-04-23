import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: 'filter',
  //pure: false //reload every time data changes
})
export class FilterPipe implements PipeTransform{

  transform(value: any, filterString: string) {
    if(value.length === 0 || filterString === ''){
      return value;
    }
    const result = [];
    for(const item of value ){
      if(item === filterString){
        result.push(item);
      }
    }
    return result;
  }

}
