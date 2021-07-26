import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'fileName' })
export class FileName implements PipeTransform {
  transform(value: any) {
    // if (value) return Math.round(value);
    if (value) {
      var startIndex =
        value.indexOf('\\') >= 0
          ? value.lastIndexOf('\\')
          : value.lastIndexOf('/');
      var filename = value.substring(startIndex);
      if (filename.indexOf('\\') === 0 || filename.indexOf('/') === 0) {
        filename = filename.substring(1);
      }
      return filename;
    }
    return null;
  }
}
